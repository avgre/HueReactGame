import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSettings = styled('div')`
  && {
    position: relative;
    background: #311b92ff;
    z-index: 1;
    width: 30%;
    height: 92vh;
  }
`;
class Settings extends Component {
  render() {
    return <StyledSettings></StyledSettings>;
  }
}

export default Settings;
