import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from '../components/console.jsx';
import { ReactComponent as Bg } from '../images/livingroom.svg';

class FloorLava extends Component {
  constructor(props) {
    super(props);
    this.hubIp = this.props.hubIp;
    this.user = this.props.user;
    this.currentColor = this.props.currentColor;
    this.state = {
      gameStart: false,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'floorislava',
    });
    this.changeLightColor(
      'blue',
      this.hubIp + '/api/' + this.user + '/lights/4/action'
    ).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: 'blue' });
    });
  }
  changeLightColor(nextColor, hubUrl) {
    console.log(nextColor);
    if (nextColor === 'blue') {
      return fetch(hubUrl, {
        method: 'PUT',
        body: '{"transitiontime":' + 0 + ',"hue":' + 8402 + '}',
      });
    } else
      return fetch(hubUrl, {
        method: 'PUT',
        body: '{"transitiontime":' + 0 + ',"hue":' + 0 + '}',
      });
  }
  render() {
    return (
      <Container>
        <Background />
        <Console
          isRunning={this.state.gameStart}
          gameName="floorislava"
          duration={90}
          timerColor={
            this.props.currentColor === 'blue' ? '#008000' : '#FF0000'
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
  @media (max-width: 480px) {
  }
`;

const Background = styled(Bg)`
  width: 100%;
  height: 100%;
  flex: 0 0 80%;
  @media (max-width: 1200px) {
    flex: 0 0 70%;
  }
  @media (max-width: 768px) {
    flex: 0 0 50%;
  }
  @media (max-width: 480px) {
    flex: 0 0 45%;
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
