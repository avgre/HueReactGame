import React, { Component } from 'react';
import styled from 'styled-components';
import Console from './Console.jsx';
import Display from './Display.jsx';

const StyledDispWrapper = styled('div')`
  && {
    position: relative;
    display: flex;
    z-index: 1;
    width: 100%;
    height: 92vh;
  }
`;

// store.js
// function reducer(state, action) {
//   switch (action.type {
//     case 'INITIALIZE_GAME': {
//       action.gameName
//     }
//   })
// }

function changeLightColor(color, hubIp) {
  return fetch(hubIp, { method: 'PUT', body: { color } });
}

// // RedLight.jsx
// class RedLight {
//   componentDidMount() {
//     const nextColor = this.props.currentColor === 'red' ? 'green' : 'red'l
//     changeLightColor(nextColor, hubIp)
//       .then(() => {
//         this.props.dispatch({ type: 'CHANGE_COLOR', color: nextColor })
//       })
//     this.props.dispatch({
//       type: 'INITIALIZE_GAME',
//       gameName: 'redlight'
//     })
//   }
//   render() {

//   }
// }

const getCurrentGame = (pathname) => {
  if (pathname === 'Red Light, Green Light') {
    return Console;
  } else if (pathname === 'The Floor is Lava') {
    return Console;
  } else if (pathname === 'Musical Chairs') {
    return Console;
  } else {
    return Console;
  }
};
class DispWrapper extends Component {
  render() {
    console.log(this.props);
    return (
      <StyledDispWrapper>
        <Display />
        <Console />
      </StyledDispWrapper>
    );
  }
}

export default DispWrapper;
