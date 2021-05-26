import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { keyframes } from 'styled-components';
import { ReactComponent as Hub } from '../images/hub.svg';
import LightControl from './settingsLight.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.requestFailed = false;
    this.state = {
      show: false,
      setLight: 1,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onToggleLight = this.onToggleLight.bind(this);
    this.onBrightnessChanged = this.onBrightnessChanged.bind(this);
    this.fetchLights = this.fetchLights.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
    console.log(this.state);
  };
  hideModal = () => {
    this.setState({ show: false });
    console.log(this.state);
  };
  chooseAnimation = () => {
    if (this.props.user) {
      return (
        <AnimationDiv>
          <BlueBulbieOn />
          <Hub />
        </AnimationDiv>
      );
    } else {
      return (
        <AnimationDiv>
          <BlueBulbie />
          <Hub />
        </AnimationDiv>
      );
    }
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

  changeLight = (id, bodyData) => {
    const url =
      'https://' +
      this.props.hubIp +
      '/api/' +
      this.props.user +
      '/lights/' +
      id +
      '/state';

    fetch(url, { method: 'PUT', body: bodyData })
      .then((response) => {
        console.log('changestate');
        if (!response.ok) {
          throw Error('Network request failed');
        }
        return response;
      })
      .then(
        (d) => {
          this.requestFailed = false;
          this.fetchLights(this.props.hubIp);
        },
        () => {
          this.requestFailed = true;
        }
      )
      .then();
  };

  onToggleLight(id, isOn) {
    const body = '{"on":' + !isOn + '}';
    this.changeLight(id, body);
  }

  onBrightnessChanged(id, newValue) {
    const body = '{"bri":' + newValue + '}';
    this.changeLight(id, body);
  }

  render() {
    const animation = this.chooseAnimation();
    const toggleHandler = this.onToggleLight;
    const brightnessHandler = this.onBrightnessChanged;
    const onchange = (data) => {
      this.setState({ setLight: data });
      console.log(this.state);
    };
    const selectLight = (id) => {
      if (id === this.state.setLight) {
        return false;
      } else return true;
    };
    const data = this.props.lights;
    console.log(this.props.lights);
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
            }}
            key={id}
            id={id}
            name={data[id].name}
            isOn={item.state.on}
            toggled={false}
            bri={item.state.bri}
            onToggleLight={toggleHandler}
            onBrightnessChanged={brightnessHandler}
            setLight={selectLight(id)}
          />
        );
        lights.push(light);
      });
    }
    return (
      <StyledSettings>
        {animation}
        {/* <button onClick={this.createUser}>Connect</button> */}
        {/* <form>
          <label>
            Authorization Token:
            <input type="text" name="Auth Token" value={this.props.user} />
          </label>
          <input type="submit" value="Submit" />
        </form> */}
        <SettingsFlex>
          <InfoFlex>
            <InfoIP>
              <span>IP Address:</span>
              <span>{this.props.hubIp}</span>
            </InfoIP>
            <InfoAuth>
              <span>Authorization Token:</span>
              <span>{this.props.user}</span>
            </InfoAuth>
          </InfoFlex>
          <InfoSpan>Select a light to connect to the game</InfoSpan>
          <LightsFlex>{lights}</LightsFlex>
        </SettingsFlex>
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
  background-position: 800px;
}
`;
const on = keyframes`
100% {
  background-position: 500px;
}
`;
const BlueBulbie = styled('div')`
  z-index: 5;
  width: 100px;
  height: 160px;
  background-image: url('/images/bulbie-jump.svg');
  animation: ${jump} 1.5s steps(8) infinite;
`;
const BlueBulbieOn = styled('div')`
  z-index: 5;
  width: 100px;
  height: 160px;
  background-image: url('/images/bulbie-on.svg');
  animation: ${on} 1s steps(5) infinite;
`;

const AnimationDiv = styled('div')`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const StyledSettings = styled('div')`
  background: #512da8ff;
  z-index: 1;
  max-width: 100%;
  height: auto;
  background-image: radial-gradient(#322290 1.05px, #5138a4 1.05px);
  background-size: 21px 21px;
  padding: 2vw calc((100vw - 800px) / 2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  color: white;
  box-sizing: border-box;
`;

const SettingsFlex = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const LightsFlex = styled('div')`
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoFlex = styled('div')`
  flex: 0 0 100%;
  margin-top: 40px;
  height: 200px;
  background: #322290;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;
const InfoIP = styled('div')`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const InfoSpan = styled.span`
  margin-top: 40px;
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoAuth = styled('div')`
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
