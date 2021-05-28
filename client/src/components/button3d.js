import React, { Component } from 'react';
import styled from 'styled-components';

const Pushable = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  :hover {
    filter: brightness(110%);
    .front {
      transform: translateY(-6px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
    .shadow {
      transform: translateY(4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }
  }
  :active {
    .front {
      transform: translateY(-2px);
      transition: transform 34ms;
    }
    .shadow {
      transform: translateY(1px);
      transition: transform 34ms;
    }
  }
  :focus:not(:focus-visible) {
    outline: none;
  }
`;
const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;
const Front = styled.span`
  display: block;
  position: relative;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1rem;
  color: white;
  background: hsl(207deg 90% 54%);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;
const Edge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    hsl(207deg 100% 16%) 0%,
    hsl(207deg 100% 32%) 8%,
    hsl(207deg 100% 32%) 92%,
    hsl(207deg 100% 16%) 100%
  );
`;
const Front2 = styled(Front)`
  background: hsl(112deg 39% 45%);
`;
const Edge2 = styled(Edge)`
  background: linear-gradient(
    to left,
    hsl(112deg 39% 16%) 0%,
    hsl(112deg 39% 32%) 8%,
    hsl(112deg 39% 32%) 92%,
    hsl(112deg 39% 16%) 100%
  );
`;
const getComponentForType = (type) => {
  if (type === 'primary') {
    return (
      <>
        <Shadow className="shadow"></Shadow>
        <Edge className="edge"></Edge>
        <Front className="front">Connect Light</Front>
      </>
    );
  } else if (type === 'secondary') {
    return (
      <>
        <Shadow className="shadow"></Shadow>
        <Edge2 className="edge"></Edge2>
        <Front2 className="front">Connected</Front2>
      </>
    );
  } else if (type === 'generate1') {
    return (
      <>
        <Shadow className="shadow"></Shadow>
        <Edge2 className="edge"></Edge2>
        <Front2 className="front">Generate new token</Front2>
      </>
    );
  } else if (type === 'generate2') {
    return (
      <>
        <Shadow className="shadow"></Shadow>
        <Edge2 className="edge"></Edge2>
        <Front2 className="front">Generate</Front2>
      </>
    );
  } else {
    return (
      <>
        <Shadow className="shadow"></Shadow>
        <Edge className="edge"></Edge>
        <Front className="front">Connect Light</Front>
      </>
    );
  }
};
class Button3d extends Component {
  render() {
    const Component = getComponentForType(this.props.type);
    return (
      <Pushable chosen={this.props.chosen} onClick={this.props.onClick}>
        {Component}
      </Pushable>
    );
  }
}
export default Button3d;

// inspired by Josh Comeau's blog here https://www.joshwcomeau.com/animation/3d-button/
