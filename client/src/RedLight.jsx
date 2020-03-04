import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from './Console.jsx';
import Button from './Button.jsx';

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

const Bulbie = styled('img')`
  && {
    z-index: 5;
    width: 160px;
    height: 160px;
    position: absolute;
    top: 500px;
    transition: transform 5000ms;
  }
`;
const Bulbie2 = styled('img')`
  && {
    padding: 30px;
    z-index: 4;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 350px;
    transition: transform 5000ms;
  }
`;
const Bulbie3 = styled('img')`
  && {
    padding: 20px;
    z-index: 3;
    width: 120px;
    height: 120px;
    position: absolute;
    top: 220px;
    transition: transform 5000ms;
  }
`;

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

function chooseBulbie(currentColor, id) {
  if (currentColor === 'green' && id === 1) {
    return '/images/blue-run.svg';
  } else if (currentColor === 'red' && id === 1) {
    return '/images/blue-handsup.svg';
  } else if (currentColor === 'green' && id === 2) {
    return '/images/pink-run.svg';
  } else if (currentColor === 'red' && id === 2) {
    return '/images/pink-handsup.svg';
  } else if (currentColor === 'green' && id === 3) {
    return '/images/yellow-run.svg';
  } else if (currentColor === 'red' && id === 3) {
    return '/images/yellow-handsup.svg';
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
    };
  }
  componentDidMount() {
    //const wrapper = document.querySelector('#wrapper')
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
    let segments = 9;
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
    changeLightColor(
      'red',
      this.hubIp + '/api/' + this.user + '/lights/1/state'
    ).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: 'red' });
    });
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
        <Container id="wrapper">
          <Bulbie
            src={chooseBulbie(this.props.currentColor, 1)}
            style={{
              transition: `transform ${timing}ms linear`,
              transform: `translate(${characterPosition1}px)`,
            }}
          />
          <Bulbie2
            src={chooseBulbie(this.props.currentColor, 2)}
            style={{
              transition: `transform ${timing}ms linear`,
              transform: `translate(${characterPosition2}px)`,
            }}
          />
          <Bulbie3
            src={chooseBulbie(this.props.currentColor, 3)}
            style={{
              transition: `transform ${timing}ms linear`,
              transform: `translate(${characterPosition3}px)`,
            }}
          />
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
