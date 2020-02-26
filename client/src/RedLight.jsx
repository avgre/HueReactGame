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
    width: 70%;
    height: 92vh;
    position: relative;
    background-image: url('/images/green.png');
    background-size: 100% 100%;
  }
`;
const Bulbie = styled('img')`
  && {
    width: 150px;
    height: 150px;
    position: absolute;
    transition: transform 500ms;
  }
`;

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
function chooseBulbie(currentColor) {
  if (currentColor === 'green') {
    return '/images/bulbies-blue-run.svg';
  } else {
    return '/images/bulbies-blue-handsup.svg';
  }
}

class RedLight extends Component {
  constructor(props) {
    super(props);
    this.hubIp = this.props.hubIp;
    this.user = this.props.user;
    this.currentColor = this.props.currentColor;
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
  }
  handleClick = () => {
    const hubUrl = this.hubIp + '/api/' + this.user + '/lights/1/state';
    const nextColor = this.props.currentColor === 'red' ? 'green' : 'red';

    changeLightColor(nextColor, hubUrl).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor });
    });
  };
  render() {
    const characterPosition = this.props.currentColor === 'green' ? 0 : 100;
    return (
      <StyledDispWrapper>
        <Container>
          <Bulbie
            fill={'none'}
            src={chooseBulbie(this.props.currentColor)}
            style={{ transform: `translate(${characterPosition}px)` }}
          />
        </Container>
        <Console
          children={<Button onClick={this.handleClick}>Change</Button>}
        />
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

//changeLightColor(nextColor, hubUrl).then(() => {
//  this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor });
//});
