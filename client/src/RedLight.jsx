import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from './Console.jsx';
import Button from './Button.jsx';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
const Timer = styled(CountdownCircleTimer)`
  && {
  }
`;

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
    min-width: 1200px;
    height: 92vh;
    position: relative;
    background-image: url('/images/green.png');
    background-size: 100% 100%;
  }
`;
const AnimationDiv1 = styled('div')`
  width: 160px;
  height: 160px;
  top: 500px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnimationDiv2 = styled('div')`
  width: 160px;
  height: 160px;
  top: 350px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnimationDiv3 = styled('div')`
  width: 160px;
  height: 160px;
  top: 220px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const run3 = keyframes`
      100% {
        background-position: 880px;
      }
`;
const YellowBulbie = styled('div')`
  && {
    z-index: 3;
    transform: scale(0.65);
    width: 110px;
    height: 155px;
    background-image: url('/images/yellow-animation-stop.svg');
    animation: ${run3} 1.6s steps(8) infinite;
  }
`;
const run2 = keyframes`
      100% {
        background-position: 960px;
      }
`;
const PinkBulbie = styled('div')`
  && {
    z-index: 4;
    transform: scale(0.75);
    width: 120px;
    height: 120px;
    background-image: url('/images/pink-animation-stop.svg');
    animation: ${run2} 1s steps(8) infinite;
    border: none;
  }
`;

const run = keyframes`
      100% {
        background-position: 800px;
      }
`;
const BlueBulbie = styled('div')`
  && {
    z-index: 5;
    transform: scale(1.1);
    width: 100px;
    height: 145px;
    background-image: url('/images/blue-animation-stop.svg');
    animation: ${run} 1s steps(8) infinite;
    border: none;
  }
`;

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
function chooseBg(currentColor) {
  if (currentColor === 'green') {
    return '/images/green.png';
  } else if (currentColor === 'red') {
    return '/images/red.png';
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
    out.reduce(function(a, b) {
      return a + b;
    });
  return out.map(function(el) {
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

function addZero(array) {
  array.unshift(0);
  return array;
}

function changeLightColor(nextColor, hubUrl) {
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
    };
  }
  componentDidMount() {
    //const wrapper = document.querySelector('#wrapper')
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
    changeLightColor(
      'red',
      this.hubIp + '/api/' + this.user + '/lights/1/state'
    ).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: 'red' });
    });
    let segments = 6;
    this.setState({
      timeSegments: addZero(
        sumArray(addDelay(divideSegments(30000, segments, 500)))
      ),
      posSegments1: addZero(
        sumArray(addDelay(divideSegments(1000, segments, 200), 'pos'))
      ),
      posSegments2: addZero(
        sumArray(addDelay(divideSegments(1000, segments, 100), 'pos'))
      ),
      posSegments3: addZero(
        sumArray(addDelay(divideSegments(1000, segments, 25), 'pos'))
      ),
    });
  }

  //handleTick = () => {
  // get current time index
  // Process
  //const nextSegmentIndex = this.state.segmentIndex + 1;

  //this.setState({
  //  segmentIndex: nextSegmentIndex,
  //});

  //this.timeoutId = this.setTimeout(this.handleTick, this.state.timeSegments[nextSegmentIndex]);
  //};

  startGame = () => {
    console.log(this.state);
    function loopDone() {
      console.log('The game is done!');
    }
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
        const hubUrl = this.hubIp + '/api/' + this.user + '/lights/1/state';
        const nextColor = this.props.currentColor === 'red' ? 'green' : 'red';
        changeLightColor(nextColor, hubUrl).then(() => {
          this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor });
        });
        if (i === this.state.timeSegments.length) {
          setTimeout(loopDone, 1000);
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
    return (
      <StyledDispWrapper>
        <Container
          id="wrapper"
          style={{
            backgroundImage: `url(${chooseBg(this.props.currentColor)})`,
          }}
        >
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
        <Console children={<Button onClick={this.startGame}>PLAY</Button>} />
      </StyledDispWrapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hubIp: state.hubAddress,
    user: state.hubUsername,
    currentColor: state.currentColor,
  };
};

export default connect(mapStateToProps)(RedLight);
