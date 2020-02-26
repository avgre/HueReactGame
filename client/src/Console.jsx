import React, { Component } from 'react';
import styled from 'styled-components';

const StyledConsole = styled('div')`
  && {
    position: relative;
    background: #311b92ff;
    width: 30%;
    height: 92vh;
    z-index: -1;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
`;

class Console extends Component {
  render() {
    return <StyledConsole>{this.props.children}</StyledConsole>;
  }
}

export default Console;
