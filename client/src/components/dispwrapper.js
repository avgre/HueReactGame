import React from 'react';
import styled from 'styled-components';

const StyledDispWrapper = styled('div')`
  background-color: #5138a4;
  opacity: 1;
  background-image: radial-gradient(#322290 1.05px, #5138a4 1.05px);
  background-size: 21px 21px;
  position: relative;
  max-width: 100%;
  padding: 0 calc((100vw - 1200px) / 2);
  height: 92vh;
  justify-content: center;
  max-height: 92vh;
  @media (max-width: 1200px) {
    padding: 0 calc((100vw - 1200px) / 2);
  }
  @media (max-width: 768px) {
    padding: 0 calc((100vw - 768px) / 2);
  }
  @media (max-width: 480px) {
    padding: 0 calc((100vw - 480px) / 2);
  }
`;
const DispWrapper = ({ children }) => {
  return <StyledDispWrapper>{children}</StyledDispWrapper>;
};

export default DispWrapper;
