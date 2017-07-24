import React, { Component } from 'react';
import Bucketlists from './Components/Bucketlists';
import AddBucketlist from './Components/AddBucketlist';
import SearchBucketlists from './Components/SearchBucketlists';
import Logout from './Components/Logout';
import { Redirect } from 'react-router-dom'
import './App.css';

var axios = require('axios');

class App extends Component {

  constructor(){
    super();
    this.state = {
      bucketlists: [],
      loginRequired: false
    }
  }

  getBucketlistsFromAPI(){
    var login_token = localStorage.getItem('login_token');
    axios.get('http://localhost:5555/api/v1/bucketlists/', {
        headers: {
          'Authorization': 'Bearer ' + login_token,
          'Content-Type': 'application/json'
        }})
    .then( (response) => {
      this.setState({
        bucketlists: response.data.bucketlists
      });
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  isUserLoggedIn(){
    var login_status = localStorage.getItem('login_status');
    var login_token = localStorage.getItem('login_token');
    if(login_status === '0' || login_token === ''){
      this.setState({loginRequired: true});
      return false;
    }else{
      this.setState({loginRequired: false});
      return true;
    }

  }

  componentWillMount(){

  }

  componentDidMount(){
    if(this.isUserLoggedIn()){
      this.getBucketlistsFromAPI();
    } 
  }

  handleAddBucketlist(bucketlist){
    // console.log(bucketlist)
    let bucketlists = this.state.bucketlists;
    bucketlists.push(bucketlist);
    this.setState({bucketlists:bucketlists});
  }

  handleDeleteBucketlist(id){
    let bucketlists = this.state.bucketlists;
    let index = bucketlists.findIndex(x => x.id === id);
    bucketlists.splice(index, 1)
    this.setState({bucketlists:bucketlists});
    axios.delete(
      'http://localhost:5555/api/v1/bucketlists/' + id,
      {headers:{'Authorization':'Bearer ' + localStorage.getItem('login_token')}})
      .then( (response) => {
        if(response.data['messages'] === 'delete_single_success'){
          alert('Bucketlist deleted successfully')
        }else{
          alert(response.data['messages'])
        }
      } )
  }
  
  render() {

    const {loginRequired} = this.state
    
    if(loginRequired){
        return (<Redirect to="/login" />)
    }else{

      return (

        <div className="App">
          <Logout />
          <AddBucketlist addBucketlist={this.handleAddBucketlist.bind(this)}/>
          <SearchBucketlists />
          <Bucketlists bucketlists={this.state.bucketlists} onDelete={this.handleDeleteBucketlist.bind(this)}/>
        </div>
      );

    }

    
  }
}

export default App;