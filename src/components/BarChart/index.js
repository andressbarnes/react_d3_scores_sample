import React, { useRef, useEffect, useContext } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';
import { Segment } from 'semantic-ui-react';
import Context from '../../context/GameScoresContext';

import useResizeObserver from '../../hooks/useResizeObserver';

const D3Component = () => {
  const { state } = useContext(Context);
  const svgRef = useRef();
  const colors = ['#99c2ff', '#4d94ff', '#0066ff', '#0047b3'];

  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const { selectedItem, data } = state;

  useEffect(() => {
    if (!dimensions) return;

    if (data) {
      //mold data
      const chartData = data.map(v => {
        return v.scores;
      });
      const chartValues = Object.values(chartData[selectedItem]);
      const chartKeys = Object.keys(chartData[0]);

      //set chart scales and axis
      const xScale = scaleBand()
        .domain(chartValues.map((d, i) => i))
        .range([0, dimensions.width])
        .padding(0.5);

      const yScale = scaleLinear()
        .domain([80, 0])
        .range([0, dimensions.height]);

      const xAxis = axisBottom(xScale)
        .ticks(chartData.length)
        .tickFormat(index => chartKeys[index]);

      const yAxis = axisRight(yScale);

      //configure the chart
      const svg = select(svgRef.current);

      svg
        .select('.x-axis')
        .style('transform', `translateY(${dimensions.height}px)`)
        .call(xAxis);
      svg
        .select('.y-axis')
        .style('transform', `translateX(${dimensions.width}px -1)`)
        .call(yAxis);
      svg
        .selectAll('.bar')
        .data(chartValues)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (v, i) => xScale(i))
        .attr('width', xScale.bandwidth())
        .style('transform', 'scale(1, -1')
        .attr('y', -dimensions.height)
        .on('mouseenter', (v, i) => {
          svg
            .selectAll('.d3tooltip')
            .data([v])
            .join(enter => enter.append('text').attr('y', yScale(v) - 4))
            .attr('class', 'd3tooltip')
            .text(v)
            .attr('x', xScale(i) + xScale.bandwidth() / 2)
            .transition()
            .attr('y', yScale(v) - 8)
            .attr('opacity', 1)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle');
        })
        .on('mouseleave', () => svg.select('.d3tooltip').remove())
        .transition()
        .duration(300)
        .attr('height', v => dimensions.height - yScale(v))
        .attr('fill', data[selectedItem].color);
    }
  }, [data, colors, dimensions, selectedItem]);

  return (
    <Segment inverted color="black" textAlign="center">
      <h3>Total score for each day</h3>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg className="d3-overflow d3-responsive" height="400" ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </Segment>
  );
};
export default D3Component;
