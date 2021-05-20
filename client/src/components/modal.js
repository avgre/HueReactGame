import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  outline: 0;
  border: 0;
  justify-content: center;
  align-items: center;
  line-height: 0.2;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;
let Modal = ({ handleClose, show, children }) => {
  return (
    <Main show={show}>
      <section>
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </Main>
  );
};

export default Modal;
