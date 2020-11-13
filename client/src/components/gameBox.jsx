import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button.jsx';

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
  height: 440px;
`;
const StyledBox = styled.div`
  position: relative;
  padding: 10px;
  background: #512da8ff;
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

class GameBox extends Component {
  handleClick = (evt) => {
    evt.preventDefault();
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
        <Button onClick={this.handleClick}>Play</Button>
      </StyledWrapper>
    );
  }
}

export default GameBox;
