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
      <Text>Remaining</Text>
      <Value>{remainingTime}</Value>
      <Text>seconds</Text>
    </Timer>
  );
};

class Console extends Component {
  render() {
    return (
      <StyledConsole>
        {this.props.gameName === 'redlight' && (
          <>
            <div>
              <StyledTitle>Red Light, Green Light</StyledTitle>
              <Desc>
                Red means stop. Green means go. But you gotta hurry before time
                runs out!
              </Desc>
            </div>
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
  font-family: 'Montserrat';
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled('div')`
  color: white;
`;
const StyledConsole = styled('div')`
  && {
    position: relative;
    background: #5133a6;
    min-width: 300px;
    z-index: 6;
    height: 92vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
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
const Desc = styled.div`
  position: relative;
  font-family: 'Montserrat';
  color: white;

  font-size: 20px;
  padding: 15px;
  width: 265px;
  align-items: center;
  font-size: 16px;
`;

//{this.props.gameName === 'lava' && <Button>Enable lava</Button>}
//{}

const mapStateToProps = (state) => {
  return { games: state.games };
};

export default connect(mapStateToProps)(Console);
