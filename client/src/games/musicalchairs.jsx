import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from '../components/Console.jsx';
import Sound from 'react-sound';

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

function chooseObjColor(currentColor, object) {
  if (currentColor === 'green' && object === 'stoplight') {
    return '/images/greenlight.svg';
  } else if (currentColor === 'red' && object === 'stoplight') {
    return '/images/redlight.svg';
  } else if (currentColor === 'red' && object === 'blimp') {
    return '/images/blimpstop.svg';
  } else if (currentColor === 'green' && object === 'blimp') {
    return '/images/blimpgo.svg';
  }
}
function divideSegments(number, parts, min) {
  const randombit = number - min * parts;
  const out = [];
  for (var i = 0; i < parts; i++) {
    out.push(Math.random());
  }
  const mult =
    randombit /
    out.reduce(function (a, b) {
      return a + b;
    });
  return out.map(function (el) {
    return el * mult + min;
  });
}
function addDelay(array, type) {
  let delay = 2000;
  if (type === 'pos') {
    delay = 0;
  }
  var newArr = [...array]
    .map((e, i) => (i < array.length - 1 ? [e, delay] : [e]))
    .reduce((a, b) => a.concat(b));
  return newArr;
}
function sumArray(array) {
  const result = array.reduce((acc, item, index) => {
    if (index === 0) {
      acc.push(item);
    } else {
      acc.push(acc[index - 1] + item);
    }
    return acc;
  }, []);
  return result;
}
function addZero(array, type) {
  let delay = 0;
  if (type === 'time') {
    delay = 2000;
  }
  array.unshift(delay);
  return array;
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
    //const wrapper = document.querySelector('#wrapper')
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
    this.changeLightColor(
      'red',
      this.hubIp + '/api/' + this.user + '/groups/6/action'
    ).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: 'red' });
    });
    let segments = 8;

    this.setState({
      segments: segments,
      timeSegments: addZero(
        sumArray(addDelay(divideSegments(14000, segments, 1000))),
        'time'
      ),
      posSegments1: addZero(
        sumArray(addDelay(divideSegments(2000, segments, 200), 'pos'))
      ),
      posSegments2: addZero(
        sumArray(addDelay(divideSegments(2000, segments, 100), 'pos'))
      ),
      posSegments3: addZero(
        sumArray(addDelay(divideSegments(2000, segments, 25), 'pos'))
      ),
    });
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
      this.hubIp + '/api/' + this.user + '/groups/6/action'
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

        const hubUrl = this.hubIp + '/api/' + this.user + '/groups/6/action';
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
    const soundPlaying =
      this.state.gameStart === false
        ? Sound.status.STOPPED
        : Sound.status.PLAYING;
    const pauseSoundPlaying =
      this.state.gameStart === true
        ? Sound.status.STOPPED
        : Sound.status.PLAYING;
    return (
      <StyledDispWrapper>
        <Container id="wrapper">
          <Sound
            url="./sounds/MeetingPlaceSCC.mp3"
            playStatus={pauseSoundPlaying}
            volume={50}
          />
          <Sound url="./sounds/runsound.mp3" playStatus={soundPlaying} />
          <Stoplight
            style={{
              backgroundImage: `url(${chooseObjColor(
                this.props.currentColor,
                'stoplight'
              )})`,
            }}
          ></Stoplight>
          {this.state.gameStart === true ? (
            <BlimpBox>
              <Blimp
                style={{
                  backgroundImage: `url(${chooseObjColor(
                    this.props.currentColor,
                    'blimp'
                  )})`,
                }}
              ></Blimp>
            </BlimpBox>
          ) : (
            <div></div>
          )}
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
        </Container>
        <Console
          isRunning={this.state.gameStart}
          gameName="redlight"
          handleStartGame={this.startGame}
          duration={30}
          timerColor={
            this.props.currentColor === 'green' ? '#008000' : '#FF0000'
          }
        />
      </StyledDispWrapper>
    );
  }
}
const StyledDispWrapper = styled('div')`
  && {
    position: relative;
    display: flex;
    z-index: 1;
    width: 100%;
    height: 92vh;
  }
`;
const Container = styled('div')`
  && {
    min-width: 2260px;
    height: 92vh;
    position: relative;
    background-image: url('/images/redlightbg.png');
    background-size: fit;
  }
`;
const AnimationDiv1 = styled('div')`
  width: 160px;
  height: 160px;
  top: 1100px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnimationDiv2 = styled('div')`
  width: 160px;
  height: 160px;
  top: 900px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnimationDiv3 = styled('div')`
  width: 160px;
  height: 160px;
  top: 730px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
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
  && {
    z-index: 4;
    transform: scale(0.9);
    top: 200px;
    width: 120px;
    height: 120px;
    background-image: url('/images/pink-animation-stop.svg');
    animation: ${run2} 1s steps(8) infinite;
    border: none;
  }
`;
const YellowBulbie = styled('div')`
  && {
    z-index: 10;
    transform: scale(0.8);
    width: 110px;
    height: 155px;
    background-image: url('/images/yellow-animation-stop.svg');
    animation: ${run3} 1.6s steps(8) infinite;
  }
`;
const BlueBulbie = styled('div')`
  && {
    z-index: 5;
    transform: scale(1.3);
    width: 100px;
    height: 145px;
    background-image: url('/images/blue-animation-stop.svg');
    animation: ${run} 1s steps(8) infinite;

    border: none;
  }
`;
const blink = keyframes`
      100% {
        background-position: 400px;
      }
`;
function getRandom(min, max) {
  const random = Math.random() * (max - min) + min;
  console.log(random);
  return random;
}
function blimpfly() {
  const fly = keyframes`
    0% {
      transform: translate(0px, ${getRandom(10, 60)}px);
    }
    25% {
      transform: translate(600px, ${getRandom(10, 60)}px);   
       }
    50% {
      transform: translate(1200px, ${getRandom(10, 60)}px);
    }
    75% {
      transform: translate(1800px, ${getRandom(10, 60)}px);   
    }
    100% {
      transform: translate(2400px, ${getRandom(10, 60)}px);   
    }
  `;
  return fly;
}
const BlimpBox = styled('div')`
  && {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 6;
    animation: ${blimpfly()} 30s linear infinite;
    border: none;
    top: 10px;
    left: -200px;
    height: 100px;
    width: 200px;
  }
`;
const Blimp = styled('div')`
  && {
    height: 100px;
    width: 200px;
    background-image: url('/images/blimpstop.svg');
    animation: ${blink} 1s steps(2) infinite;
    border: none;
  }
`;
const Stoplight = styled('div')`
  && {
    top: 550px;
    left: 1200px;
    position: absolute;
    width: 100px;
    height: 200px;
    background-image: url('/images/redlight.svg');
    background-size: 100% 100%;
    border: none;
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

//handleTick = () => {
// get current time index
// Process
//const nextSegmentIndex = this.state.segmentIndex + 1;

//this.setState({
//  segmentIndex: nextSegmentIndex,
//});

//this.timeoutId = this.setTimeout(this.handleTick, this.state.timeSegments[nextSegmentIndex]);
//};
