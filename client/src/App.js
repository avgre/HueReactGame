import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
      <Route path="/" exact component={GameMenu} />
      <Route path="/redlight" exact component={RedLight} />
      <Route path="/floorislava" exact component={FloorLava} />
      <Route path="/musicalchairs" exact component={Musical} />
    </BrowserRouter>
  );
}

export default App;
