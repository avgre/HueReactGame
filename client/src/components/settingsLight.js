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
  return (
    <Light>
      <Title>{props.name}</Title>

      {/* <Toggle
        id={props.id}
        onChange={(e) => {
          setIsToggled(e.target.checked);
          handleChange(e.target.checked);
        }}
      /> */}
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
        <Toggle
          id={'t2' + props.id}
          toggled={props.isOn}
          onChange={(e) => {
            setIsToggled(e.target.checked);
            props.onToggleLight(props.id, props.isOn);
          }}
        />
        <input
          id={'slider' + props.id}
          type="range"
          value={props.bri}
          min="0"
          max="256"
          step={10}
          onChange={(event, newValue) => {
            props.onBrightnessChanged(props.id, event.target.value);
          }}
        />
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
  margin-top: 40px;
`;

const Flex = styled('div')`
  flex: 0 0 50%;
  height: 250px;
  display: flex;
`;
const ControlDiv = styled('div')`
  display: flex;
`;
const Title = styled.span`
  color: white;
`;
