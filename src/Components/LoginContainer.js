import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

var axios = require('axios');

class LoginContainer extends Component {

  constructor(){
    super();
    this.state = {
        user: {},
        redirectToHome: false
    }

  }


  componentWillMount(){

  }

  componentDidMount(){
    
  }

  doLogin(user){
    axios.post('http://localhost:5555/api/v1/auth/login/', user, {
        headers: {'Content-Type': "application/json"}})
    .then( (response) => {
        if(response.status === 200 && response.data['messages'] === "login_success"){
            localStorage.setItem('login_status', '1');
            localStorage.setItem('login_token', response.data['user_token']);
            this.setState({redirectToHome: true});
        }
        else{
            localStorage.setItem('login_status', '0');
            localStorage.setItem('login_token', '');
            this.setState({redirectToHome: false});
            alert(response.data['messages']);
        }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  handleLogin(e){
      if(this.refs.email.value === '' || this.refs.password.value === ''){
            alert('Please fill in the email and password')
        }else{
            this.setState({user: {
                "email": this.refs.email.value,
                "password": this.refs.password.value
                
            }}, function(){
                // console.log(this.state)
                this.doLogin(this.state.user)
            })
        }
        e.preventDefault()
  }

  render() {
    
    const { redirectToHome } = this.state 

    if(redirectToHome){
        return (<Redirect to="/" />)
    }

    var login_status = localStorage.getItem('login_status');
    var login_token = localStorage.getItem('login_token');
    if((login_status === '1') && (login_token.length > 0)){
        return (<Redirect to="/" />)
    }

    return (
      <div className="Login">
          <h3>Login</h3>
          <form onSubmit={this.handleLogin.bind(this)}>
            <div>
                 <label>Email</label><br />
                 <input type="text" ref="email" /><br />
                 <label>Password</label><br />
                 <input type="password" ref="password" /><br />
            </div><br />
            <input type="submit" value="Submit" /> <Link to="/register"> Register</Link><br />
        </form>
      </div>
    );
  }
}

export default LoginContainer;
