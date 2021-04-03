import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './button.jsx';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const StyledWrapper = styled.div`
  padding-top: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  width: 380px;
  height: auto;
`;
const StyledBox = styled.div`
  position: relative;
  padding: 10px;
  z-index: 2;
  align-items: center;
  display: inline-block;
  justify-content: center;
  border-style: none;
`;
const StyledTitle = styled.div`
  padding-top: 15px;
  padding-bottom: 20px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
`;
const StyledImg = styled.img`
  border-radius: 20px;
  width: 325px;
  height: 250px;
`;
const StyledText = styled.div`
  padding-bottom: 20px;
  font-family: 'Montserrat';
  color: white;
  max-width: 300px;
  font-size: 14px;
`;
const StyledLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class GameBox extends Component {
  handleClick = (evt) => {
    console.log('whatthe');
  };
  render() {
    return (
      <StyledWrapper>
        <StyledBox>
          <StyledImg src={this.props.game.img} />
        </StyledBox>
        <StyledTitle>{this.props.game.name}</StyledTitle>
        <StyledText>{this.props.game.desc}</StyledText>

        <StyledLink to={'/' + this.props.game.slug}>
          <Button onClick={this.handleClick}>Play</Button>
        </StyledLink>
      </StyledWrapper>
    );
  }
}

export default withRouter(GameBox);
