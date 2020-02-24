import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './GameNav.jsx';
import GameMenu from './GameMenu.jsx';
import DispWrapper from './DispWrapper.jsx';
import RedLight from './RedLight.jsx';

function App() {
  fetch('/api/hello')
    .then((res) => res.json())
    .then((json) => console.log(json));
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={GameMenu} />
      <Route path="/RedLight" exact component={RedLight} />
      <Route path="/FloorIsLava" exact component={DispWrapper} />
    </BrowserRouter>
  );
}

export default App;
