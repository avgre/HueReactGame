import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button.jsx';

const StyledWrapper = styled('div')`
  && {
    padding-top: 40px;
    position: relative;
    display: inline-block;
    justify-content: center;
    text-align: center;
    width: 380px;
    height: 440px;
  }
`;
const StyledBox = styled('div')`
  && {
    position: relative;
    padding: 10px;
    background: #512da8ff;
    z-index: 2;
    align-items: center;
    display: inline-block;
    justify-content: center;
    border-style: none;
  }
`;
const StyledTitle = styled('div')`
  && {
    padding-top: 15px;
    padding-bottom: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    font-size: 20px;

    font-weight: bold;
    justify-content: center;
  }
`;
const StyledImg = styled('img')`
  && {
    object-fit: fit;
    border-radius: 20px;
    width: 325px;
    height: 250px;
  }
`;
const StyledText = styled('div')`
  && {
    display: inline-block;
    padding-bottom: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 300px;
    text-align: justify;
    text-justify: inter-word;
    font-size: 14px;
    line-height: 16pt;
  }
`;

class GameBox extends Component {
  handleClick = (evt) => {
    evt.preventDefault();
    console.log('hi');
  };
  render() {
    return (
      <StyledWrapper>
        <StyledBox>
          <StyledImg src={this.props.game.img} />
        </StyledBox>
        <StyledTitle>{this.props.game.name}</StyledTitle>
        <StyledText>{this.props.game.desc}</StyledText>
        <Button onClick={this.handleClick}>Play</Button>
      </StyledWrapper>
    );
  }
}

export default GameBox;
