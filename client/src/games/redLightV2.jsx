import React, { Component } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Console from '../components/console.jsx';
import Sound from 'react-sound';
import { ReactComponent as Bg } from '../images/trackrun.svg';

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
    const { current } = this.ref;
    console.log(`${current.offsetWidth}, ${current.offsetHeight}`);
  }
  render() {
    return (
      <Container ref={this.ref}>
        <Background />
        <Console
          isRunning={this.state.gameStart}
          gameName="redlight"
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

const run = keyframes`
100% {
  background-position: 800px;
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
    flex-direction: column;
  }
`;

const Background = styled(Bg)`
  width: 100%;
  height: auto;
  flex: 0 0 80%;
  overflow: visible;
  @media (max-width: 1200px) {
    flex: 0 0 70%;
  }
  @media (max-width: 768px) {
    flex: 0 0 55%;
  }
  @media (max-width: 480px) {
    flex: 0 0 45%;
  }
`;
const Style = styled.div`
  flex: 0 0 80%;
  overflow: visible;
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
