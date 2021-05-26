import React from 'react';
import styled from 'styled-components';

const Switch = ({ id, toggled, onChange }) => {
  return (
    <>
      <SwitchInput
        className="switch-checkbox"
        type="checkbox"
        key={id}
        id={id}
        checked={toggled}
        onChange={onChange}
      />
      <SwitchLabel className="switch-label" htmlFor={id}>
        <SwitchButton className="switch-button" />
      </SwitchLabel>
    </>
  );
};

export default Switch;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 55px;
  height: 33px;
  border-radius: 100px;
  border: 2px solid #2196f3;
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchButton = styled.span`
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 25px;
  height: 25px;
  border-radius: 33px;
  transition: 0.2s;
  background: #2196f3;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  ${SwitchInput}:checked + ${SwitchLabel} & {
    background: #53a147;
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
  ${SwitchLabel}:active & {
    width: 45px;
  }
`;
