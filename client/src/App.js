import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/gameNav.jsx';
import GameMenu from './components/gameMenu.jsx';
import Settings from './components/settings.jsx';
import floorLava from './games/redLightV2.jsx';
import redLight from './games/redLight.jsx';
import musicalChairs from './games/musicalChairs.jsx';

function App() {
  // fetch('/api/hello')
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/settings" exact component={Settings} />
      <StyledDispWrapper>
        <Route path="/" exact component={GameMenu} />
        <Route path="/redlight" exact component={redLight} />
        <Route path="/floorislava" exact component={floorLava} />
        <Route path="/musicalchairs" exact component={musicalChairs} />
      </StyledDispWrapper>
    </BrowserRouter>
  );
}

export default App;

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
