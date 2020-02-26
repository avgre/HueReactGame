import React, { Component } from 'react';
import styled from 'styled-components';
import Console from './Console.jsx';
import Display from './Display.jsx';
import RedLight from './RedLight.jsx';

const StyledDispWrapper = styled('div')`
  && {
    position: relative;
    display: flex;
    z-index: 1;
    width: 100%;
    height: 92vh;
  }
`;

const getCurrentGame = (pathname) => {
  if (pathname === 'RedLight') {
    return RedLight;
  } else if (pathname === 'The Floor is Lava') {
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
    return (
      <StyledDispWrapper>
        <Display>
          <Game />
        </Display>
        <Console />
      </StyledDispWrapper>
    );
  }
}

export default DispWrapper;
