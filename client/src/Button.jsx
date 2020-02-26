import React, { Component } from 'react';
import styled from 'styled-components';
const ButtonDefault = styled.button`
  background-color: #512da8ff;
  position: relative;
  display: inline-block;
  z-index: 3;
  color: white;
  justify-content: center;
  padding-top: 5px;
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 5px;
  border: solid;
  border-color: white;
  border-width: 1px;
  border-radius: 45px;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background: #1ed23eff;
    border-color: #1ed23eff;
  }
`;
const PlayButton = styled('div')`
  display: inline-block;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 8px solid;
  padding-right: 4px;
  &:hover {
  }
`;

const StartButton = styled(ButtonDefault)`
  background: #1ed23eff;
  &:hover {
  }
`;

const getComponentForType = (type) => {
  if (type === 'primary') {
    return ButtonDefault;
  } else if (type === 'secondary') {
    return StartButton;
  } else {
    return ButtonDefault;
  }
};

class Button extends Component {
  render() {
    //let style = {
    //  backgroundColor: this.props.isDisabled ? "gray" : "",
    //  cursor: this.props.isDisabled ? "not-allowed" : "pointer"
    //};

    const Component = getComponentForType(this.props.type);
    return (
      <Component
        style={{
          background: {},
        }}
        onClick={this.props.onClick}
      >
        <PlayButton />
        {this.props.children}
      </Component>
    );
  }
}
export default Button;
