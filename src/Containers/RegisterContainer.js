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

class RegisterContainer extends Component {

  addAlert = this.addAlert.bind(this);
    addAlert(title, message, containerType){
        if(containerType === 'success'){
            this.refs.container.success(message, title, { timeOut: 1000, closeButton:true });
        }else{
            this.refs.container.error(message, title, { timeOut: 1000, closeButton:true });
        }  
    }    

  doRegister(user){
    axios.post('http://localhost:5555/api/v1/auth/register/', user)
    .then((response) => {
        if(response.status === 200 && response.data['messages'] === "registration_success"){
            localStorage.setItem('login_status', 1);
            localStorage.setItem('login_token', response.data['user_token']);
            this.props.setUser({
                "name": user['name'],
                "email": user['email'],
                "password": user['password']
            });
            this.props.setRedirect(true);
        }
        else{
            localStorage.setItem('login_status', 0);
            localStorage.setItem('login_token', '');
            this.props.setRedirect(false);
            this.addAlert('Error', response.data['messages'], 'error');
        }
    })
    .catch(function (error) {
      this.addAlert('Error', error, 'error');
    });
  }

  handleRegister(e){
      if(this.refs.email.value === '' || this.refs.password.value === '' || this.refs.name.value === ''){
            this.addAlert('Error', 'Please fill in the name, email and password', 'error');
        }else{
            this.doRegister({
                "name": this.refs.name.value,
                "email": this.refs.email.value,
                "password": this.refs.password.value
                
            })
        }
        e.preventDefault()
  }

  render() {

    if(this.props.register.redirectToHome){
        return (<Redirect to="/" />)
    }

    var login_status = localStorage.getItem('login_status');
    var login_token = localStorage.getItem('login_token');
    if((login_status === '1') && (login_token.length > 0)){
        return (<Redirect to="/" />)
    }

    return (
      <div className="Register">
          <div>
              <ToastContainer ref="container"
                              toastMessageFactory={ToastMessageFactory}
                              className="toast-top-right" />
          </div>
          <Container fluid style={
              {'width': '40%', 'marginTop': '5%', 'padding': '50px', 'border': '1px solid #e8e8e8'}}>
            <Header as="h3">Register</Header>
          <Form onSubmit={this.handleRegister.bind(this)}>
            <div>
                <Form.Field>
                 <input style={{'width':'100%'}} placeholder='Name...' type="text" ref="name" /><br />
                 <Label pointing>Name</Label><br />
                </Form.Field>
                <Divider /><br />
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
            <Button primary type="submit">Submit</Button> <Link to="/login"> Already Registered? Login</Link><br />
        </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        register: state.registerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (newuser) => {
            dispatch({
                type: actionTypes.REGISTER_USER,
                payload: newuser
            })
        },
        setRedirect: (redirect) => {
            dispatch({
                type: actionTypes.REGISTER_REDIRECT,
                payload: redirect
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)