import React, { useRef, useEffect, useContext } from 'react';
import { select, axisRight, axisBottom, scaleLinear, scaleBand } from 'd3';
import { Segment } from 'semantic-ui-react';
import Context from '../../context/GameScoresContext';

import useResizeObserver from '../../hooks/useResizeObserver';

const GroupedBarChart = () => {
  const { state, dispatch } = useContext(Context);
  const { data, selectedItem } = state;

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (data) {
      if (!dimensions) return;

      //mold data
      const chartData = data.map(v => {
        return v.scores;
      });

      const chartValues = Object.keys(chartData[0]);
      const groupKey = 'day'; //day

      let newData = [];
      chartValues.forEach((element, i) => {
        newData.push({
          day: element,
          values: data.map((elm, j) => {
            return {
              value: elm.scores[element],
              gamer: elm.gamer,
              color: elm.color
            };
          })
        });
      });

      var categoriesNames = newData.map(function(d) {
        return d.day;
      });

      //configure the chart
      const svg = select(svgRef.current);
      const svgContent = svg.select('.content');

      const margin = { top: 10, right: 10, bottom: 20, left: 40 };

      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      //set the x positions of the groups
      const xGroup = scaleBand()
        .domain(newData.map(d => d[groupKey]))
        .range([margin.left, width - margin.right])
        .paddingInner(0.1);

      //set chart scales and axis
      const xScale = scaleBand()
        .domain(chartValues.map((d, i) => i))
        .range([0, width])
        .padding(0.5);

      const yScale = scaleLinear()
        .domain([80, 0])
        .range([0, height]);

      const xAxis = axisBottom(xScale)
        .ticks(chartData.length)
        .tickFormat(index => categoriesNames[index]);

      const yAxis = axisRight(yScale);

      svg
        .select('.x-axis')
        .style('transform', `translateY(${dimensions.height}px)`)
        .call(xAxis);
      svg
        .select('.y-axis')
        .style('transform', `translateX(${dimensions.width}px -1)`)
        .call(yAxis);

      svgContent
        .selectAll('g')
        .data(newData)
        .join('g')
        .attr('class', `bar-container`)
        .attr('transform', d => `translate(${xGroup(d[groupKey])},0)`)
        .selectAll('rect')
        .data(v =>
          v.values.map(value => ({
            day: value.day,
            value,
            color: value.color
          }))
        )
        .join('rect')
        .attr('x', (d, ix) => ix * 6)
        .attr('y', -dimensions.height)
        .attr('fill', d => d.color)
        .attr('width', 5)
        .style('transform', 'scale(1, -1')
        .on('mouseenter', (v, ip) => {
          dispatch({ type: 'ITEM_HOVER_CHANGED', payload: ip });
        })
        .on('mouseleave', (v, ip) => {
          dispatch({ type: 'ITEM_HOVER_CHANGED', payload: -1 });
        })
        .on('click', (v, ip) => {
          dispatch({ type: 'SELECT_ITEM_CHANGED', payload: ip });
        })
        .transition()
        .delay(function(d) {
          return Math.random() * 1000;
        })
        .attr('height', v => dimensions.height - yScale(v.value.value));
    }
  }, [data, dimensions, dispatch, selectedItem]);

  return (
    <Segment inverted color="black" textAlign="center">
      <h3>Total score for each day</h3>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg className="d3-overflow d3-responsive" height="400" ref={svgRef}>
          <g className="content"></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </Segment>
  );
};
export default GroupedBarChart;
