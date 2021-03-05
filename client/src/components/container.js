import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled('div')`
  max-width: 100%;
  display: flex;
  max-height: 92vh;
  height: 92vh;
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Container = ({ children }) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
