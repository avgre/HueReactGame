import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from '../components/console.jsx';
import Sound from 'react-sound';
import { ReactComponent as Bg } from '../images/gradient-track.svg';
import { createGameArray } from '../helpers/gameArray.js';
import Container from '../components/container.js';

function chooseBulbie(currentColor, id) {
  if (currentColor === 'green' && id === 1) {
    return '/images/blue-animation-run.svg';
  } else if (currentColor === 'red' && id === 1) {
    return '/images/blue-animation-stop.svg';
  } else if (currentColor === 'green' && id === 2) {
    return '/images/pink-animation-run.svg';
  } else if (currentColor === 'red' && id === 2) {
    return '/images/pink-animation-stop.svg';
  } else if (currentColor === 'green' && id === 3) {
    return '/images/yellow-animation-run.svg';
  } else if (currentColor === 'red' && id === 3) {
    return '/images/yellow-animation-stop.svg';
  }
}

class RedLight extends Component {
  constructor(props) {
    super(props);
    this.hubIp = this.props.hubIp;
    this.user = this.props.user;
    this.currentColor = this.props.currentColor;
    this.state = {
      currentTime: 0,
      currentPos1: 0,
      nextPos1: 0,
      currentPos2: 0,
      nextPos2: 0,
      currentPos3: 0,
      nextPos3: 0,
      deltaTime: 0,
      gameStart: false,
    };
  }
  componentDidMount() {
    const rectmain = document.querySelector('#rectmain');
    const bboxRect = rectmain.getBoundingClientRect();
    console.log('bbox', bboxRect.width);
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
    this.changeLightColor(
      'red',
      this.hubIp + '/api/' + this.user + '/lights/10/state'
    ).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: 'red' });
    });
    let segments = 8;
    let distance = bboxRect.width - bboxRect.width * 0.1;
    let spread1 = distance / segments + 3;
    let spread2 = distance / segments - 3;
    let spread3 = distance / segments;
    this.setState({
      segments: segments,
      timeSegments: createGameArray(14000, segments, 1000, 'time'),
      posSegments1: createGameArray(distance, segments, spread1, 'pos'),
      posSegments2: createGameArray(distance, segments, spread2, 'pos'),
      posSegments3: createGameArray(distance, segments, spread3, 'pos'),
    });
    console.log(this.state);
  }
  changeLightColor(nextColor, hubUrl) {
    console.log(nextColor);

    if (nextColor === 'green') {
      return fetch(hubUrl, {
        method: 'PUT',
        body: '{"transitiontime":' + 0 + ',"hue":' + 20000 + '}',
      });
    } else
      return fetch(hubUrl, {
        method: 'PUT',
        body: '{"transitiontime":' + 0 + ',"hue":' + 0 + '}',
      });
  }
  loopDone = () => {
    console.log('The game is done!');
    this.changeLightColor(
      'red',
      this.hubIp + '/api/' + this.user + '/lights/10/state'
    ).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: 'red' });
    });
  };
  startGame = () => {
    this.setState(
      { gameStart: true, totalTime: this.state.segments * 2 - 1 },
      () => {
        console.log(this.state);
      }
    );
    for (let i = 1; i < this.state.timeSegments.length; i++) {
      //let timeouId =
      setTimeout(() => {
        this.setState({
          currentPos1: this.state.posSegments1[i],
          nextPos1: this.state.posSegments1[i + 1],
          currentPos2: this.state.posSegments2[i],
          nextPos2: this.state.posSegments2[i + 1],
          currentPos3: this.state.posSegments3[i],
          nextPos3: this.state.posSegments3[i + 1],
          deltaTime:
            this.state.timeSegments[i] - this.state.timeSegments[i - 1],
        });

        const hubUrl = this.hubIp + '/api/' + this.user + '/lights/10/state';
        const nextColor = this.props.currentColor === 'red' ? 'green' : 'red';
        this.changeLightColor(nextColor, hubUrl).then(() => {
          this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor });
        });
        if (i === this.state.timeSegments.length - 1) {
          i = i + 1;
        }
        if (i === this.state.timeSegments.length) {
          setTimeout(this.loopDone, 2000);
        }
      }, this.state.timeSegments[i]);
    }
  };

  render() {
    const characterPosition1 =
      this.props.currentColor === 'green'
        ? this.state.nextPos1
        : this.state.currentPos1;
    const characterPosition2 =
      this.props.currentColor === 'green'
        ? this.state.nextPos2
        : this.state.currentPos2;
    const characterPosition3 =
      this.props.currentColor === 'green'
        ? this.state.nextPos3
        : this.state.currentPos3;
    const timing =
      this.props.currentColor === 'green' ? this.state.deltaTime : 2000;
    // const soundPlaying =
    //   this.state.gameStart === false
    //     ? Sound.status.STOPPED
    //     : Sound.status.PLAYING;
    // const pauseSoundPlaying =
    //   this.state.gameStart === true
    //     ? Sound.status.STOPPED
    //     : Sound.status.PLAYING;
    return (
      <Container id="wrapper">
        {/* <Sound
          url="./sounds/MeetingPlaceSCC.mp3"
          playStatus={pauseSoundPlaying}
          volume={50}
        />
        <Sound url="./sounds/runsound.mp3" playStatus={soundPlaying} /> */}
        <BgDiv>
          <AnimationDiv1
            style={{
              transition: `transform ${timing}ms linear`,
              transform: `translate(${characterPosition1}px)`,
            }}
          >
            <BlueBulbie
              style={{
                backgroundImage: `url(${chooseBulbie(
                  this.props.currentColor,
                  1
                )})`,
              }}
            />
          </AnimationDiv1>
          <AnimationDiv2
            style={{
              transition: `transform ${timing}ms linear`,
              transform: `translate(${characterPosition2}px)`,
            }}
          >
            <PinkBulbie
              style={{
                backgroundImage: `url(${chooseBulbie(
                  this.props.currentColor,
                  2
                )})`,
              }}
            />
          </AnimationDiv2>
          <AnimationDiv3
            style={{
              transition: `transform ${timing}ms linear`,
              transform: `translate(${characterPosition3}px)`,
            }}
          >
            <YellowBulbie
              style={{
                backgroundImage: `url(${chooseBulbie(
                  this.props.currentColor,
                  3
                )})`,
              }}
            />
          </AnimationDiv3>
          <Background />
        </BgDiv>
        <Console
          isRunning={this.state.gameStart}
          gameName="redlight"
          handleStartGame={this.startGame}
          duration={30}
          timerColor={
            this.props.currentColor === 'green' ? '#008000' : '#FF0000'
          }
        />{' '}
      </Container>
    );
  }
}

const BgDiv = styled.div`
  position: relative;
  flex: 0 0 80%;
  @media (max-width: 1200px) {
    flex: 0 0 70%;
  }
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const Background = styled(Bg)`
  width: 100%;
  height: auto;
`;

const AnimationDiv1 = styled('div')`
  bottom: 30%;
  position: absolute;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    left: -3%;
    bottom: 20%;
  }
  @media (max-width: 480px) {
  }
`;
const AnimationDiv2 = styled('div')`
  bottom: 0%;
  position: absolute;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    left: -5%;
    bottom: -5%;
  }
  @media (max-width: 480px) {
  }
`;
const AnimationDiv3 = styled('div')`
  bottom: 15%;
  position: absolute;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    left: -5%;
    bottom: 4%;
  }
  @media (max-width: 480px) {
  }
`;
const run = keyframes`
100% {
  background-position: 800px;
}
`;
const run2 = keyframes`
      100% {
        background-position: 960px;
      }
`;
const run3 = keyframes`
      100% {
        background-position: 880px;
      }
`;
const PinkBulbie = styled('div')`
  z-index: 4;
  width: 120px;
  height: 120px;
  background-image: url('/images/pink-animation-stop.svg');
  animation: ${run2} 1s steps(8) infinite;
  transform: scale(0.8);

  @media (max-width: 1200px) {
    transform: scale(0.6);
  }
  @media (max-width: 768px) {
    transform: scale(0.4);
  }
  @media (max-width: 480px) {
    transform: scale(0.3);
  }
`;
const YellowBulbie = styled('div')`
  z-index: 10;
  transform: scale(0.8);
  width: 110px;
  height: 155px;
  background-image: url('/images/yellow-animation-stop.svg');
  animation: ${run3} 1.6s steps(8) infinite;
  @media (max-width: 1200px) {
    transform: scale(0.6);
  }
  @media (max-width: 768px) {
    transform: scale(0.4);
  }
  @media (max-width: 480px) {
    transform: scale(0.3);
  }
`;
const BlueBulbie = styled('div')`
  z-index: 5;
  transform: scale(0.8);
  width: 100px;
  height: 145px;
  background-image: url('/images/blue-animation-stop.svg');
  animation: ${run} 1s steps(8) infinite;
  @media (max-width: 1200px) {
    transform: scale(0.6);
  }
  @media (max-width: 768px) {
    transform: scale(0.4);
  }
  @media (max-width: 480px) {
    transform: scale(0.3);
  }
`;

const mapStateToProps = (state) => {
  return {
    hubIp: state.hubAddress,
    user: state.hubUsername,
    currentColor: state.currentColor,
  };
};

export default connect(mapStateToProps)(RedLight);
