import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from '../components/console.jsx';
import { ReactComponent as Bg } from '../images/gradient-track.svg';
import Container from '../components/container.js';

class RedLight extends Component {
  constructor(props) {
    super(props);
    this.hubIp = this.props.hubIp;
    this.user = this.props.user;
    this.currentColor = this.props.currentColor;
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
    const wrapper = document.querySelector('#wrapper');
    console.log('client', wrapper.clientWidth + 'x' + wrapper.clientHeight);
    const rectmain = document.querySelector('#rectmain');
    const bboxRect = rectmain.getBoundingClientRect();
    console.log('bbox', bboxRect);
    const pink = document.querySelector('#pink');
    console.log('pink', pink);
  }
  render() {
    return (
      <Container>
        <Background id="wrapper" ref={this.ref} />
        <Console
          isRunning={this.state.gameStart}
          gameName="floorislava"
          duration={30}
          timerColor={
            this.props.currentColor === 'green' ? '#008000' : '#FF0000'
          }
        />
      </Container>
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

const Background = styled(Bg)`
  width: 80%;
  height: auto;
  flex: 0 0 80%;
  overflow: visible;
  @media (max-width: 1200px) {
    flex: 0 0 70%;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 55%;
  }
  @media (max-width: 480px) {
    flex: 0 0 45%;
  }
`;

//handleTick = () => {
// get current time index
// Process
//const nextSegmentIndex = this.state.segmentIndex + 1;

//this.setState({
//  segmentIndex: nextSegmentIndex,
//});

//this.timeoutId = this.setTimeout(this.handleTick, this.state.timeSegments[nextSegmentIndex]);
//};
