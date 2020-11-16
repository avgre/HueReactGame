import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from '../components/Console.jsx';
import { ReactComponent as Bg } from '../images/redlightbg.svg';

function getRandom(min, max) {
  const random = Math.random() * (max - min) + min;
  console.log(random);
  return random;
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

class FloorLava extends Component {
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
      payload: 'floorlava',
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
    return (
      <Container>
        <Background />
        <Console
          isRunning={this.state.gameStart}
          gameName="redlight"
          handleStartGame={this.startGame}
          duration={30}
          timerColor={
            this.props.currentColor === 'green' ? '#008000' : '#FF0000'
          }
        />
      </Container>
    );
  }
}

const Container = styled('div')`
  display: flex;
  max-height: 92vh;
  height: 92vh;
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Background = styled(Bg)`
  width: 100%;
  height: 100%;
  flex: 0 0 80%;
  @media (max-width: 1200px) {
    flex: 0 0 70%;
  }
  @media (max-width: 800px) {
    flex: 0 0 50%;
  }
  @media (max-width: 320px) {
  }
`;

const mapStateToProps = (state) => {
  return {
    hubIp: state.hubAddress,
    user: state.hubUsername,
    currentColor: state.currentColor,
  };
};

export default connect(mapStateToProps)(FloorLava);

//handleTick = () => {
// get current time index
// Process
//const nextSegmentIndex = this.state.segmentIndex + 1;

//this.setState({
//  segmentIndex: nextSegmentIndex,
//});

//this.timeoutId = this.setTimeout(this.handleTick, this.state.timeSegments[nextSegmentIndex]);
//};
