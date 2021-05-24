import React, { useState } from 'react';
import Toggle from './toggle.js';
import styled from 'styled-components';

function LightControl(props) {
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = (event) => {
    props.onchange(event);
  };
  return (
    <Flex>
      <Light>
        <Title>{props.name}</Title>

        <Toggle
          id={props.id}
          onChange={(e) => {
            setIsToggled(e.target.checked);
            handleChange(e.target.checked);
          }}
        />
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
    </Flex>
  );
}

export default LightControl;

const Light = styled('div')`
  width: 350px;
  height: 200px;
  background: #322290;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Flex = styled('div')`
  flex: 0 0 50%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ControlDiv = styled('div')`
  display: flex;
`;
const Title = styled('h4')`
  color: white;
`;
