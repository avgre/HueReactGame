import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled('div')`
  && {
    position: relative;
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    font-weight: bold;
    font-size: 30px;
    left: 3%;
    height: 8vh;
    transform: translateY(25%);
  }
`;
const StyledNavbar = styled('div')`
  && {
    position: relative;
    display: block;
    background: #311b92ff;
    z-index: 2;
    height: 8vh;
    width: 100%;
  }
`;

function Navbar() {
  return (
    <StyledNavbar>
      <StyledTitle>GAMES WITH HUE</StyledTitle>
    </StyledNavbar>
  );
}

export default Navbar;
