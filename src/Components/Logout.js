import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class LogOut extends Component {

  componentWillMount(){

  }

  componentDidMount(){

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

export default LogOut;