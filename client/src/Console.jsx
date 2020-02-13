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
    return <StyledConsole></StyledConsole>;
  }
}

export default Console;
