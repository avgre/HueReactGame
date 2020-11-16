import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button.jsx';
import { connect } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <Timer>Game Over!</Timer>;
  }
  return (
    <Timer>
      <span>Remaining</span>
      <Value>{remainingTime}</Value>
      <span>seconds</span>
    </Timer>
  );
};

class Console extends Component {
  render() {
    return (
      <StyledConsole>
        {this.props.gameName === 'redlight' && (
          <>
            <Title>
              <StyledTitle>Red Light, Green Light</StyledTitle>
              <Desc>
                Red means stop. Green means go. But you gotta hurry before time
                runs out!
              </Desc>
            </Title>

            <TimerWrapper>
              <CountdownCircleTimer
                isPlaying={this.props.isRunning}
                duration={this.props.duration}
                colors={[[this.props.timerColor]]}
                onComplete={() => [false, 1000]}
                trailColor={'#311b92ff'}
              >
                {renderTime}
              </CountdownCircleTimer>
            </TimerWrapper>
          </>
        )}
        <Button onClick={this.props.handleStartGame}>PLAY</Button>
      </StyledConsole>
    );
  }
}

const TimerWrapper = styled('div')`
  display: flex;
  justify-content: center;
  z-index: 7;
`;
const Value = styled('div')`
  font-size: 40px;
  color: white;
`;
const Timer = styled('div')`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const StyledConsole = styled('div')`
  position: relative;
  z-index: 3;
  flex: 0 0 20%;
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  color: white;
  @media (max-width: 1200px) {
    flex: 0 0 30%;
  }
  @media (max-width: 768px) {
    flex: 0 0 50%;
    flex-direction: row;
  }
`;
const StyledTitle = styled('div')`
  font-family: 'Boogaloo', cursive;
  position: relative;
  color: white;
  font-size: 20px;
  padding: 15px;
`;
const Desc = styled.div`
  font-size: 20px;
  font-size: 16px;
  max-width: 90%;
`;
const Title = styled.div`
  font-size: 20px;
  font-size: 16px;
  max-width: 90%;
`;
//{this.props.gameName === 'lava' && <Button>Enable lava</Button>}
//{}

const mapStateToProps = (state) => {
  return { games: state.games };
};

export default connect(mapStateToProps)(Console);
