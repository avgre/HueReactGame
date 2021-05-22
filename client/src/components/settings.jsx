import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { keyframes } from 'styled-components';
import { ReactComponent as Hub } from '../images/hub.svg';
import Modal from './modal.js';
import LightControl from './settingsLight.js';

// async function fetchLights() {
//   let response = await fetch(
//     'https://' + this.props.hubIp + '/api/' + this.props.user + '/lights'
//   );
//   console.log('response', response);
//   if (!response.ok) {
//     throw new Error('Network request failed');
//   }
//   let bridgeLights = await response.json();
//   return bridgeLights;
// }

// async function fetchIP() {
//   let response = await fetch('https://discovery.meethue.com/');
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   let bridgeIP = await response.json();
//   return bridgeIP;
// }

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lights: {},
      show: false,
      responseFailed: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
    console.log(this.state);
  };
  hideModal = () => {
    this.setState({ show: false });
    console.log(this.state);
  };

  componentDidMount() {
    if (this.props.user === undefined) this.fetchIP();
  }
  fetchLights = async (ip) => {
    console.log('fetchLights called');
    let response = await fetch(
      'https://' + ip + '/api/' + this.props.user + '/lights'
    );

    if (!response.ok) {
      throw new Error('Network request failed');
    }
    let bridgeLights = await response.json();
    console.log(bridgeLights);
    this.props.dispatch({
      type: 'SET_LIGHTS',
      payload: bridgeLights,
    });
  };
  fetchIP = async () => {
    console.log('fetchIP called');
    const response = await fetch('https://discovery.meethue.com/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bridgeIP = await response.json();
    this.props.dispatch({
      type: 'SET_BRIDGE_IP',
      payload: bridgeIP[0].internalipaddress,
    });

    this.fetchLights(bridgeIP[0].internalipaddress);
  };
  componentDidUpdate() {}
  checkHueData = () => {
    if (this.props.user && this.props.hubIp) {
    }
  };
  createUser = () => {
    fetch('https://' + this.props.hubIp + '/api/', {
      method: 'POST',
      body: '{"devicetype":"games_with_hue#browser"}',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0].error) {
          console.log('error has occured', data);
        } else {
          this.props.dispatch({
            type: 'SET_USER',
            payload: data[0].success.username,
          });
        }
      });
    this.fetchLights(this.props.hubIp);
  };

  log = () => {
    console.log(this.state);
  };

  render() {
    const onchange = (data) => {
      this.setState({ data });
      console.log('Form>', data);
    };
    const data = this.props.lights;
    const lights = [];

    if (this.props.lights.length === 1) {
      console.log('error');
    } else {
      Object.keys(data).forEach(function (id, index) {
        const item = data[id];
        const light = (
          <LightControl
            onchange={(e) => {
              onchange(e);
              console.log(id, e);
            }}
            key={id}
            id={id}
            name={data[id].name}
            isOn="false"
            toggled={false}
            bri={item.state.bri}
          />
        );

        lights.push(light);
      });
    }
    return (
      <StyledSettings>
        <button type="button" onClick={this.showModal}></button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <form>
            <label>
              Hue Bridge IP Address:
              <input type="text" name="Bridge IP" value={this.props.hubIp} />
            </label>
            <label>
              Hue Bridge Username:
              <input type="text" name="Bridge User" value={this.props.user} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
        <AnimationDiv>
          <BlueBulbie />
          <Hub />
        </AnimationDiv>
        <button onClick={this.createUser}>Set User</button>
        <span>
          Click <a href="https://discovery.meethue.com/">here</a> to find your
          IP
        </span>
        <form>
          <label>
            Name: {this.props.hubIp}
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <button onClick={this.log}>log</button>

        <span> Name: {this.props.user}</span>
        <div>{lights}</div>
      </StyledSettings>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hubIp: state.hubAddress,
    user: state.hubUsername,
    lights: state.lights,
  };
};

export default connect(mapStateToProps)(Settings);

const jump = keyframes`
100% {
  background-position: 700px;
}
`;
const BlueBulbie = styled('div')`
  z-index: 5;
  width: 100px;
  height: 140px;
  background-image: url('/images/bulbie-jump.svg');
  animation: ${jump} 1s steps(7) infinite;
`;

const AnimationDiv = styled('div')`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const StyledSettings = styled('div')`
  position: relative;
  background: #512da8ff;
  z-index: 1;
  width: 100%;
  height: 92vh;
`;
