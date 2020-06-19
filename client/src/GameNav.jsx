import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  && {
    position: relative;
    font-family: 'Montserrat';
    color: white;
    font-weight: bolder;
    font-size: 20px;
    padding: 15px;
  }
`;
const StyledNavbar = styled('div')`
  && {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #311b92ff;
    z-index: 2;
    height: 8vh;
    width: auto;
  }
`;

function Navbar() {
  return (
    <StyledNavbar>
      <StyledTitle>GAMES WITH HUE</StyledTitle>
      <FlexLink>
        <StyledLink to={'/'}>HOME</StyledLink>
        <StyledLink to={'/'}>SETTINGS</StyledLink>
        <StyledLink to={'/'}>ACCOUNT</StyledLink>
      </FlexLink>
    </StyledNavbar>
  );
}

export default Navbar;
