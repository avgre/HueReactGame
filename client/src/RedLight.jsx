import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from './Button.jsx';

const Container = styled('div')`
  && {
    width: 70%;
    height: 92vh;
    position: relative;
    background-image: url('/client/public/images/green.png');
  }
`;

const Animation = styled('div')`
  && {
    width: 50px;
    height: 50px;
    position: absolute;
    background: red;
  }
`;

function changeLightColor(nextColor, hubUrl) {
  console.log(hubUrl);
  if (nextColor === 'green') {
    return fetch(hubUrl, {
      method: 'PUT',
      body: '{"hue":' + '20000' + ',' + '"sat":' + '254' + '}',
    });
  } else
    return fetch(hubUrl, {
      method: 'PUT',
      body: '{"hue":' + '0' + ',' + '"sat":' + '254' + '}',
    });
}

class RedLight extends Component {
  constructor(props) {
    super(props);
    this.hubIp = this.props.hubIp;
    this.user = this.props.user;
    this.currentColor = this.props.currentColor;
  }
  handleClick = (evt) => {
    const hubUrl = this.hubIp + '/api/' + this.user + '/lights/1/state';
    const nextColor = this.props.currentColor === 'red' ? 'green' : 'red';
    changeLightColor(nextColor, hubUrl).then(() => {
      this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor });
    });
    console.log(this.props);
    console.log('next:' + nextColor);
    console.log('current:' + this.props.currentColor);
  };
  componentDidMount() {
    //const hubUrl = this.hubIp + '/api/' + this.user + '/lights/1/state';
    //const nextColor = this.props.currentColor === 'red' ? 'green' : 'red';
    //changeLightColor(nextColor, hubUrl).then(() => {
    //  this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor });
    //});
    this.props.dispatch({
      type: 'INITIALIZE_GAME',
      payload: 'redlight',
    });
  }
  //getUrlWithUsername() {
  //  return this.props.hubIp + '/api/' + this.props.user + '/lights';
  //}

  //ToggleLightGreen(id) {
  //  const bodyData = '{"hue":' + 26000 + '}';
  //  this.changeState(id, bodyData);
  //}
  //ToggleLightRed(id) {
  //  const bodyData = '{"hue":' + 25600 + '}';
  //  this.changeState(id, bodyData);
  // }
  render() {
    return (
      <Container>
        <Animation />
        <Button onClick={this.handleClick}>Change</Button>
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
