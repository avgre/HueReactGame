import React, { useState } from 'react';
import Toggle from './toggle.js';

function LightControl(props) {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div>
      <div>
        <div checked={props.isOn} name={props.name}>
          {'Name: ' + props.name + '  On: ' + props.isOn}
          <Toggle
            id="light-switch"
            toggled={props.isOn}
            onChange={(e) => setIsToggled(e.target.checked)}
          />
          <input type="range" value={props.bri} min="0" max="256" />
        </div>
      </div>
    </div>
  );
}

export default LightControl;
