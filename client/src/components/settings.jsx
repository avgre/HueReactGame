import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledSettings = styled('div')`
  position: relative;
  background: #512da8ff;
  z-index: 1;
  width: 100%;
  height: 92vh;
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.hubURL =
      'https://192.168.12.100/api/-BHo-XWLWKff53wesEVS8BrKp7QkVUJTn3TEGCrd/lights/3/state';
    this.state = { hueip: null };
  }
  componentDidMount() {
    fetch('https://discovery.meethue.com/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].internalipaddress);
        this.props.dispatch({
          type: 'SET_BRIDGE_IP',
          payload: data[0].internalipaddress,
        });
      });
  }
  changeLightColor(hubUrl) {
    console.log(this.hubURL + 'lights/3/state');
    fetch(hubUrl, {
      method: 'PUT',
      body: '{"transitiontime":' + 0 + ',"on":' + false + '}',
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    return;
  }
  connectHub(hubUrl) {
    console.log(this.hubURL + 'lights/3/state');
    fetch(hubUrl, {
      method: 'PUT',
      body: '{"transitiontime":' + 0 + ',"on":' + false + '}',
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    return;
  }
  render() {
    return (
      <StyledSettings>
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
        <span>Ip sent to redux store on submit</span>
        <span>Use ip to to access debugger</span>
        <button onClick={this.changeLightColor(this.hubURL)}>Click</button>
      </StyledSettings>
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

export default connect(mapStateToProps)(Settings);
