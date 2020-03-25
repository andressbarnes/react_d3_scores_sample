import React, { useEffect, useContext } from 'react';
import Axios from 'axios';
import { Segment } from 'semantic-ui-react';
import Context from '../../context/GameScoresContext';

//components
import List from '../../components/GamersList';
import BarChart from '../../components/BarChart';
import GroupedBarChart from '../../components/GroupedBarChart';

const App = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    Axios.get('http://localhost:4000/gamers')
      .then(res => {
        dispatch({ type: 'RECIEVED_DATA', payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <>
      <Segment basic inverted color="purple">
        Game Score Tracker
      </Segment>
      <Segment.Group horizontal style={{ margin: '20px' }}>
        <List />
        {state.selectedItem === -1 ? <GroupedBarChart /> : <BarChart />}
      </Segment.Group>
    </>
  );
};

export default App;
