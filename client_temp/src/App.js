import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './GameNav.jsx';
import GameMenu from './GameMenu.jsx';
import DispWrapper from './DispWrapper.jsx';

function App() {
  fetch('/api/hello')
    .then((res) => res.json())
    .then((json) => console.log(json));
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={GameMenu} />
      <Route path="/RedLightGreenLight" exact component={DispWrapper} />
    </BrowserRouter>
  );
}

export default App;
