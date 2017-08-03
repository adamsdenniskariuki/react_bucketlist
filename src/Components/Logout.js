import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionTypes from '../Actions/ActionTypes';

class LogOut extends Component {


  componentWillMount(){
    this.props.setRedirect(false)
  }

  logoutUser(){
      localStorage.setItem('login_status', '0');
      localStorage.setItem('login_token', '');
  }
  
  render() {
    
    return (
        <Link onClick={this.logoutUser} to="/login">Log Out</Link>
    )

  }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRedirect: (redirect) => {
            dispatch({
                type: actionTypes.LOGIN_REDIRECT,
                payload: redirect
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);