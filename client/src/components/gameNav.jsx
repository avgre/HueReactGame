import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Settings from './settings.jsx';

const FlexLink = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  width: 350px;

  align-items: center;
  justify-content: space-evenly;
  font-size: 16px;
  height: 8vh;
`;

const StyledLink = styled(Link)`
  padding: 10px;
  text-decoration: none;
  color: white;
  font-family: 'Montserrat';
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const StyledTitle = styled('div')`
  position: relative;
  font-family: 'Boogaloo', cursive;
  color: white;
  font-weight: 300;
  font-size: 30px;
  padding: 10px;
`;
const StyledNavbar = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #322290;
  z-index: 2;
  height: 8vh;
  width: auto;
`;

function Navbar() {
  return (
    <StyledNavbar>
      <StyledTitle>GAMES WITH HUE</StyledTitle>
      {/* <FlexLink>
        <StyledLink to={'/'}>HOME</StyledLink>
        <StyledLink to={'/'}>SETTINGS</StyledLink>
        <StyledLink to={'/'}>ACCOUNT</StyledLink>
      </FlexLink> */}
    </StyledNavbar>
  );
}

export default Navbar;
