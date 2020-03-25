import React from 'react';
import ReactDOM from 'react-dom';
import { GameScoresContext } from './context/GameScoresContext';

//containers
import App from './containers/App';

//styles
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <GameScoresContext>
    <App />
  </GameScoresContext>,
  document.getElementById('root')
);
