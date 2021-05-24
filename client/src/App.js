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
        {/* <Route path="/musicalchairs" exact component={musicalChairs} /> */}
      </StyledDispWrapper>
    </BrowserRouter>
  );
}

export default App;
