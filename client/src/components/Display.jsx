import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDisplay = styled('div')`
  && {
    position: relative;
    background: green;
    z-index: 1;
    width: 70%;
    height: 92vh;
  }
`;
class Display extends Component {
  render() {
    return <StyledDisplay></StyledDisplay>;
  }
}

export default Display;
