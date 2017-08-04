import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { 
    Container,
    Header,  
    Label, 
    Divider,
    Button, 
    Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionTypes from '../Actions/ActionTypes';

var axios = require('axios');
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class LoginContainer extends Component {

  addAlert = this.addAlert.bind(this);
    addAlert(title, message, containerType){
        if(containerType === 'success'){
            this.refs.container.success(message, title, { timeOut: 1000, closeButton:true });
        }else{
            this.refs.container.error(message, title, { timeOut: 1000, closeButton:true });
        }  
    }  

  doLogin(user){
    axios.post('http://localhost:5555/api/v1/auth/login/', user, {
        headers: {'Content-Type': "application/json"}})
    .then( (response) => {
        if(response.status === 200 && response.data['messages'] === "login_success"){
            localStorage.setItem('login_status', '1');
            localStorage.setItem('login_token', response.data['user_token']);
            this.props.setUser({
                "email": user['email'],
                "password": user['password']
            });
            this.props.setRedirect(true)
        }
        else{
            localStorage.setItem('login_status', '0');
            localStorage.setItem('login_token', '');
            this.props.setRedirect(false)
            this.addAlert('Error', response.data['messages'], 'error');
        }
    })
    .catch(function (error) {
      this.addAlert('Error', error, 'error');
    });
  }

  handleLogin(e){
      if(this.refs.email.value === '' || this.refs.password.value === ''){
            this.addAlert('Error', 'Please fill in the email and password', 'error');
        }else{
            this.doLogin({
                "email": this.refs.email.value,
                "password": this.refs.password.value 
            })
        }
        e.preventDefault()
  }

  render() {

    if(this.props.user.redirectToHome){
        return (<Redirect to="/" />)
    }

    var login_status = localStorage.getItem('login_status');
    var login_token = localStorage.getItem('login_token');
    if((login_status === '1') && (login_token.length > 0)){
        return (<Redirect to="/" />)
    }

    return (
      <div className="Login">
          <div>
              <ToastContainer ref="container"
                              toastMessageFactory={ToastMessageFactory}
                              className="toast-top-right" />
          </div>
          <Container fluid style={
              {'width': '40%', 'marginTop': '5%', 'padding': '50px', 'border': '1px solid #e8e8e8'}}>
            <Header as="h3">Login</Header>
            <Form onSubmit={this.handleLogin.bind(this)}>
                <div>
                    <Form.Field>
                        <input style={{'width':'100%'}} placeholder='Email...' type="text" ref="email" /><br />
                        <Label pointing>Email</Label><br />
                    </Form.Field>
                    <Divider /><br />
                    <Form.Field>
                        <input style={{'width':'100%'}} placeholder='Password...' type="password" ref="password" /><br />
                        <Label pointing>Password</Label><br />
                    </Form.Field>
                </div><br />
                <Button primary type="submit">Submit</Button><Link to="/register"> Register</Link><br />
            </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: actionTypes.LOGIN_USER,
                payload: user
            })
        },
        setRedirect: (redirect) => {
            dispatch({
                type: actionTypes.LOGIN_REDIRECT,
                payload: redirect
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
