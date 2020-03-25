import React, { useContext } from 'react';
import { List, Image, Segment, Icon } from 'semantic-ui-react';
import Context from '../../context/GameScoresContext';

const GamersList = () => {
  const { state, dispatch } = useContext(Context);
  const updateSelectedItem = index => {
    dispatch({ type: 'SELECT_ITEM_CHANGED', payload: index });
  };

  const renderAllItem = () => {
    return (
      <List.Item
        active={state.selectedItem === -1 ? true : false}
        key={'all'}
        onClick={() => updateSelectedItem(-1)}
      >
        <List.Content align="center">
          <List.Header>View all</List.Header>
        </List.Content>
      </List.Item>
    );
  };

  const renderList = () => {
    return state.data.map(item => {
      return (
        <List.Item
          active={state.selectedItem === item.id ? true : false}
          className={state.itemHover === item.id ? 'highlighted' : null}
          key={item.id}
          onClick={() => updateSelectedItem(item.id)}
        >
          <Image avatar src={item.avatar} />
          <List.Content>
            <List.Header>{item.gamer}</List.Header>
          </List.Content>
          <List.Content floated="right">
            <Icon name="circle" style={{ color: `${item.color}` }} />
          </List.Content>
        </List.Item>
      );
    });
  };

  return (
    <>
      <Segment
        inverted
        color="black"
        style={{ maxWidth: '300px', minWidth: '300px' }}
      >
        <div align="center">
          <h3>Gamers</h3>
        </div>
        <List size="mini" inverted selection verticalAlign="middle">
          {state.data ? (
            <>
              {renderAllItem()} {renderList()}
            </>
          ) : (
            <>LOADING</>
          )}
        </List>
      </Segment>
    </>
  );
};

export default GamersList;
