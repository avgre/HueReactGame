import React, { Component } from 'react';
import styled from 'styled-components';

const StyledConsole = styled('div')`
  && {
    position: relative;
    background: #311b92ff;
    z-index: 1;
    width: 30%;
    height: 92vh;
  }
`;
//const getSettingsForGame = (title) => {
//  if (title === 'Red Light, Green Light') {
//    return StyledConsole;
//  } else if (title === 'The Floor is Lava') {
//    return StyledConsole;
//  } else if (title === 'Musical Chairs') {
//    return StyledConsole;
//  } else {
//    return StyledConsole;
//  }
//};
class Console extends Component {
  async componentDidMount() {
    let response = await fetch('/api/settings', {
      method: 'GET',
    });
    let json = await response.json();
    this.props.dispatch({
      type: 'SET_SETTINGS',
      payload: json.settings,
    });
  }
  render() {
    //const Component = getComponentForType(this.props.id);
    return <StyledConsole></StyledConsole>;
  }
}

export default Console;
