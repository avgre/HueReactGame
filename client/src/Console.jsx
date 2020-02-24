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

class Console extends Component {
  render() {
    return <StyledConsole></StyledConsole>;
  }
}

export default Console;
