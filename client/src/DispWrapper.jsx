import React, { Component } from 'react';
import styled from 'styled-components';
import Console from './Console.jsx';
import Display from './Display.jsx';

const StyledDispWrapper = styled('div')`
  && {
    position: relative;
    display: flex;
    z-index: 1;
    width: 100%;
    height: 92vh;
  }
`;
class DispWrapper extends Component {
  render() {
    console.log(this.props);
    return (
      <StyledDispWrapper>
        <Display />
        <Console />
      </StyledDispWrapper>
    );
  }
}

export default DispWrapper;
