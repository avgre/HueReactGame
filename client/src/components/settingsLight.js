import React, { useState } from 'react';
import Toggle from './toggle.js';
import styled from 'styled-components';
import Button from './button3d.js';

function LightControl(props) {
  const [isToggled, setIsToggled] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const handleChange = (event) => {
    props.onchange(event);
  };
  const handleSelect = (status) => {
    if (status) {
      return 'primary';
    } else return 'secondary';
  };
  const chooseColor = (isOn) => {
    if (isOn) {
      return '#53a147';
    } else return '#2196f3';
  };
  return (
    <Light>
      <Title>{props.name}</Title>
      <Button
        onClick={(e) => {
          setIsClicked(!isClicked);
          handleChange(props.id);
        }}
        chosen={props.isSet}
        type={handleSelect(props.setLight)}
      >
        Connect light
      </Button>
      <ControlDiv>
        <StyledToggle>
          <Toggle
            id={'Switch' + props.id}
            toggled={props.isOn}
            onChange={(e) => {
              setIsToggled(e.target.checked);
              props.onToggleLight(props.id, props.isOn);
            }}
            color={chooseColor(props.isOn)}
          />
        </StyledToggle>
        <StyledInput>
          <Input
            id={'slider' + props.id}
            type="range"
            value={props.bri}
            min="0"
            max="256"
            step={10}
            onChange={(event) => {
              props.onBrightnessChanged(props.id, event.target.value);
            }}
          />
        </StyledInput>
      </ControlDiv>
    </Light>
  );
}

export default LightControl;

const Light = styled('div')`
  flex: 0 0 50%;
  max-width: 360px;
  height: 200px;
  background: #322290;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
`;

const ControlDiv = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledInput = styled('div')`
  flex: 0 0 55%;
`;
const Input = styled('input')`
  margin-left: 0;
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  :-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
  :-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
`;
const StyledToggle = styled('div')`
  flex: 0 1 10%;
  height: 100%;
`;
const Title = styled.span`
  color: white;
`;
