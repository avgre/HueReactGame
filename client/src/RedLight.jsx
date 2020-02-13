import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledRedLight = styled('div')`
  && {
    padding-top: 40px;
    position: relative;
    display: inline-block;
    justify-content: center;
    text-align: center;
    width: 380px;
    height: 440px;
  }
`;

class RedLight extends Component {
    constructor(props) {
        super(props);
        this.settings = props.settings;
        this.hubIp = props.hubIp;
    }
    componentDidMount() {
            const nextColor = this.props.currentColor === 'red' ? 'green' : 'red';
            changeLightColor(nextColor, hubIp)
               .then(() => {
                 this.props.dispatch({ type: 'CHANGE_COLOR', payload: nextColor })
               })
    /     this.props.dispatch({
               type: 'INITIALIZE_GAME',
               payload: 'redlight'
             })
           }
  render() {
    return <StyledRedLight></StyledRedLight>;
  }
}

const mapStateToProps = (state) => {
    return { settings: state.games.redlight.settings,
    hubIp: state.hubIp };
  };
  
export default connect(mapStateToProps)(RedLight);