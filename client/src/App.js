import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/gameNav.jsx';
import GameMenu from './components/gameMenu.jsx';
import RedLight from './games/redLight.jsx';
import FloorLava from './games/floorLava.jsx';
import Musical from './games/musicalchairs.jsx';

function App() {
  // fetch('/api/hello')
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));
  return (
    <BrowserRouter>
      <Navbar />
      <StyledDispWrapper>
        <Route path="/" exact component={GameMenu} />
        <Route path="/redlight" exact component={RedLight} />
        <Route path="/floorislava" exact component={FloorLava} />
        <Route path="/musicalchairs" exact component={Musical} />
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
`;
