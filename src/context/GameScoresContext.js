import React, { useReducer } from 'react';

let reducer = (state, action) => {
  switch (action.type) {
    case 'RECIEVED_DATA':
      const keys = action.payload.map(item => {
        return item.gamer;
      });
      return { ...state, data: action.payload, keys };
    case 'SELECT_ITEM_CHANGED':
      return { ...state, selectedItem: action.payload };
    case 'ITEM_HOVER_CHANGED':
      return { ...state, itemHover: action.payload };
    default:
      return;
  }
};

const initialState = {
  selectedItem: -1,
  itemHover: -1,
  data: null
};

const Context = React.createContext();

export const GameScoresContext = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
