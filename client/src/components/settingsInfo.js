import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './button3d.js';
import Modal from './modal.js';
import { ReactComponent as Check } from '../images/check.svg';
import { ReactComponent as Cross } from '../images/cross.svg';
function LightControl(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [onStep, setStep] = useState(1);
  const handleChange = (event) => {
    props.onchange(event);
  };

  const showModal = () => {
    setIsOpen(true);
    return;
  };
  const hideModal = () => {
    setIsOpen(false);
    return;
  };
  const chooseStep = (user, clicked) => {
    if (user) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <Span>{props.user}</Span>
          <Flex>
            <StyledCheck />
            <span>Lights Connected</span>
            <TipSpan> Tip: Copy/save token for next time</TipSpan>
          </Flex>
        </>
      );
    } else if (clicked) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <Span>Press the bridge button then click Generate.</Span>
          <GenerateNew>
            <Button onClick={props.create} type="generate2" />
          </GenerateNew>
        </>
      );
    } else if (!clicked) {
      return (
        <>
          <Title>Authorization Token:</Title>
          <Flex>
            <GenerateNew>
              <Button onClick={setIsClicked} type="generate1" />
            </GenerateNew>
            <GenerateExisting>
              <Existing onClick={showModal}>Use existing token</Existing>
            </GenerateExisting>
          </Flex>
        </>
      );
    }
  };
  const chooseStatus = (ip) => {
    if (ip) {
      return (
        <Flex>
          <StyledCheck />
          <span>Bridge detected</span>
        </Flex>
      );
    } else {
      return (
        <Flex>
          <StyledCross />
          <span>No Bridge Found</span>
        </Flex>
      );
    }
  };

  return (
    <InfoFlex>
      <InfoIP>
        <Title>IP Address:</Title>
        <Span>{props.ip}</Span>
        {chooseStatus(props.ip)}
      </InfoIP>
      <InfoAuth>
        {chooseStep(props.user, isClicked)}
        <Modal show={isOpen} handleClose={hideModal}>
          <form>
            <label>
              <input type="text" name="Auth Token" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </InfoAuth>
    </InfoFlex>
  );
}

export default LightControl;

const InfoFlex = styled('div')`
  flex: 0 0 100%;
  margin-top: 40px;
  height: 200px;
  background: #322290;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
`;

const InfoSpan = styled.span`
  margin-top: 40px;
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InfoIP = styled('div')`
  flex: 0 0 20%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
const InfoAuth = styled('div')`
  flex: 0 0 65%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const GenerateNew = styled.div`
  width: auto;
  margin-top: 20px;
`;
const GenerateExisting = styled.div`
  width: auto;
  margin-top: 20px;
  margin-left: 20px;
  align-self: center;
`;
const Flex = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Existing = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: underline;
`;
const Span = styled.span`
  margin-top: 20px;
  font-weight: 500;
`;
const TipSpan = styled.span`
  margin-left: 20px;
`;
const Title = styled.span`
  margin-top: 40px;
`;

const StyledCheck = styled(Check)`
  margin-right: 5px;
`;
const StyledCross = styled(Cross)`
  margin-right: 5px;
`;
