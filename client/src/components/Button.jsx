import React, { Component } from 'react';
import styled from 'styled-components';
const ButtonDefault = styled.button`
  background-color: #512da8ff;
  position: relative;
  display: flex;
  z-index: 3;
  color: white;
  justify-content: center;
  align-content: center;
  padding: 10px 40px;
  border: solid;
  width: 150px;
  border-color: white;
  border-width: 1px;
  border-radius: 45px;
  font-size: 20px;
  font-weight: bold;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #1ed23eff;
    border-color: #1ed23eff;
  }
`;
const PlayButton = styled('div')`
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-left: 16px solid;
  padding-right: 8px;
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
