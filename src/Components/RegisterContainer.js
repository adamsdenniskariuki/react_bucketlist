import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { 
    Container,
    Header, 
    Input, 
    Label, 
    Divider,
    Button, 
    Form } from 'semantic-ui-react'

var axios = require('axios');

class RegisterContainer extends Component {

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

  doRegister(user){
    axios.post('http://localhost:5555/api/v1/auth/register/', user)
    .then((response) => {
        if(response.status === 200 && response.data['messages'] === "registration_success"){
            localStorage.setItem('login_status', 1);
            localStorage.setItem('login_token', response.data['user_token']);
            this.setState({redirectToHome: true});
        }
        else{
            localStorage.setItem('login_status', 0);
            localStorage.setItem('login_token', '');
            this.setState({redirectToHome: false});
            alert(response.data['messages']);
        }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleRegister(e){
      if(this.refs.email.value === '' || this.refs.password.value === '' || this.refs.name.value === ''){
            alert('Please fill in the name, email and password')
        }else{
            this.setState({user: {
                "name": this.refs.name.value,
                "email": this.refs.email.value,
                "password": this.refs.password.value
                
            }}, function(){
                // console.log(this.state)
                this.doRegister(this.state.user)
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
      <div className="Register">
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

export default RegisterContainer;