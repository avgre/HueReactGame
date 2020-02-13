import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GameBox from './GameBox.jsx';

const StyledGameMenu = styled('div')`
  && {
    position: relative;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    background: #512da8ff;
    z-index: 1;
    justify-content: space-between;
    width: auto;
    height: 100%;
    padding-left: 50px;
    padding-right: 50px;
  }
`;

class GameMenu extends Component {
  async componentDidMount() {
    let response = await fetch('/api/games', {
      method: 'GET',
    });
    let json = await response.json();
    this.props.dispatch({
      type: 'SET_GAMES',
      payload: json.games,
    });
  }
  render() {
    return (
      <div>
        <StyledGameMenu>
          {this.props.games.map((game) => (
            <GameBox game={game} />
          ))}
        </StyledGameMenu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { games: state.games };
};

export default connect(mapStateToProps)(GameMenu);
