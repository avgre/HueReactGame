import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled('div')`
  max-width: 100%;
  width: 100%;
  display: flex;
  max-height: 92vh;
  height: 92vh;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
  }
`;

const Container = ({ children }) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;
