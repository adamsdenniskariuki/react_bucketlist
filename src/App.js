import React, { Component } from 'react';
import Bucketlists from './Components/Bucketlists';
import AddBucketlist from './Components/AddBucketlist';
import SearchBucketlists from './Components/SearchBucketlists';
import Logout from './Components/Logout';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionTypes from './Actions/ActionTypes';
import './App.css';

var axios = require('axios');

class App extends Component {

  getBucketlistsFromAPI(){
    var login_token = localStorage.getItem('login_token');
    axios.get('http://localhost:5555/api/v1/bucketlists/', {
        headers: {
          'Authorization': 'Bearer ' + login_token,
          'Content-Type': 'application/json'
        }})
    .then( (response) => {
      this.props.setBuckets(response.data.bucketlists);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  isUserLoggedIn(){
    var login_status = localStorage.getItem('login_status');
    var login_token = localStorage.getItem('login_token');
    if(login_status === '0' || login_token === ''){
      this.props.setRedirect(true);
      return false;
    }else{
      this.props.setRedirect(false);
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
    let bucketlists = this.props.app.bucketlists;
    bucketlists.push(bucketlist);
    this.props.setBuckets(bucketlists);
  }

  handleSearchBucketlist(bucketlists){
    this.props.setBuckets(bucketlists);
  }

  handleDeleteBucketlist(id){
    let bucketlists = this.props.app.bucketlists;
    let index = bucketlists.findIndex(x => x.id === id);
    bucketlists.splice(index, 1)
    this.props.setBuckets(bucketlists);
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
    
    if(this.props.app.loginRequired){
        return (<Redirect to="/login" />)
    }else{

      return (

        <div className="App" style={{'width':'100%', 'padding': '10px'}}>
          <Logout />
          <div style={{'width':'100%', 'paddingLeft':'10px', 'paddingRight':'18%'}}>
          <AddBucketlist addBucketlist={this.handleAddBucketlist.bind(this)}/>
          <SearchBucketlists searchBucketlist={this.handleSearchBucketlist.bind(this)} />
          </div>
          <Bucketlists bucketlists={this.props.app.bucketlists} onDelete={this.handleDeleteBucketlist.bind(this)}/>
        </div>
      );

    }

    
  }
}

const mapStateToProps = (state) => {
    return {
        app: state.appReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBuckets: (buckets) => {
            dispatch({
                type: actionTypes.APP_BUCKETS,
                payload: buckets
            })
        },
        setRedirect: (redirect) => {
            dispatch({
                type: actionTypes.APP_REDIRECT,
                payload: redirect
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)