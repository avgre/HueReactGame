import React, { Component } from 'react';
import styled from 'styled-components';
import Console from './Console.jsx';
import Display from './Display.jsx';

const StyledDispWrapper = styled('div')`
  position: relative;
  width: 100%;
  padding: 0 calc((100vw - 1200px) / 2);
  justify-content: center;
  height: 92vh;
`;

const getCurrentGame = (pathname) => {
  if (pathname === 'redlight') {
    return RedLight;
  } else if (pathname === 'floorislava') {
    return Display;
  } else if (pathname === 'Musical Chairs') {
    return Display;
  } else {
    return Display;
  }
};
class DispWrapper extends Component {
  render() {
    const gamename = this.props.location.pathname;
    const Game = getCurrentGame(gamename);
    console.log(this.props);
    return <StyledDispWrapper />;
  }
}

export default DispWrapper;
