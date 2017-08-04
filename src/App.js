import React, { Component } from 'react';
import Bucketlists from './Components/Bucketlists';
import AddBucketlist from './Components/AddBucketlist';
import SearchBucketlists from './Components/SearchBucketlists';
import Logout from './Components/Logout';
import Paginate from './Components/Paginate';
import Dialog from './Components/Dialog';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionTypes from './Actions/ActionTypes';
import './App.css';

var axios = require('axios');
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const styles = {
  app: {
    'width':'100%', 
    'padding': '10px',
    'marginLeft': '8%'
  },
  content: {
    'clear': 'both',
    'width':'90%', 
    'paddingLeft':'10px', 
    'paddingRight':'18%'
  }
}

class App extends Component {

  addAlert = this.addAlert.bind(this);
    addAlert(title, message, containerType){
        if(containerType === 'success'){
            this.refs.container.success(message, title, { timeOut: 1000, closeButton:true });
        }else{
            this.refs.container.error(message, title, { timeOut: 1000, closeButton:true });
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
      this.props.setBuckets(response.data.bucketlists);
      if(response.data['messages'].includes("Access Denied")){
        this.addAlert('Error', response.data['messages'], 'error');
        var login_status = localStorage.setItem('login_status', '');
      var login_token = localStorage.setItem('login_token', '');
        this.props.setRedirect(true);
      }
      
    })
    .catch((error) => {
      this.addAlert('Error', JSON.stringify(error), 'error');
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

  componentDidMount(){
    if(this.isUserLoggedIn()){
      this.getBucketlistsFromAPI();
    } 
  }

  handleAddBucketlist(bucketlist){
    let bucketlists = this.props.app.bucketlists;
    bucketlists.splice(bucketlist);
    this.props.setBuckets(bucketlists);
  }

  handleSearchBucketlist(bucketlists){
    this.props.setBuckets(bucketlists);
  }

  handleUpdateBucketlist(id){
    this.props.setModalOpen(true);
    this.props.setModalSize("tiny");
    this.props.setModalName("update_bucket");
    this.props.setModalHeader("Update Bucket List");
    this.props.setModalContent({"content": "updateBucketField"});
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
          this.addAlert('Bucket list Deletion', 'Bucketlist deleted successfully', 'success');
        }else{
          this.addAlert('Error', response.data['messages'], 'error');
        }
      } )
  }
  
  handleAddItem(id){
    this.props.setModalOpen(true);
    this.props.setModalSize("tiny");
    this.props.setModalName("add_items");
    this.props.setModalHeader("Add Item");
    this.props.setModalContent({"content": "addItemField"});

  }

  handleModalClose(modalClose){
    this.props.setModalOpen(false)
  }

  handleViewItem(id){
    this.props.setModalOpen(true);
    this.props.setModalSize("tiny");
    this.props.setModalName("view_items");
    this.props.setModalHeader("View Items");
    this.props.setModalContent({"content": this.props.app.bucketlists});
  }
  
  render() {
    
    if(this.props.app.loginRequired){
        return (<Redirect to="/login" />)
    }else{

      return (
        
        <div className="App" style={styles.app}>
          <div>
              <ToastContainer ref="container"
                              toastMessageFactory={ToastMessageFactory}
                              className="toast-top-right" />
          </div>
          <Logout />
          <div style={styles.content}>
            <AddBucketlist addBucketlist={this.handleAddBucketlist.bind(this)}/>
            <SearchBucketlists searchBucketlist={this.handleSearchBucketlist.bind(this)} />
            <Paginate />
          </div>
          <Bucketlists 
          viewItem={this.handleViewItem.bind(this)} 
          addItem={this.handleAddItem.bind(this)} 
          bucketlists={this.props.app.bucketlists}
          onUpdate={this.handleUpdateBucketlist.bind(this)} 
          onDelete={this.handleDeleteBucketlist.bind(this)}/>
          <Dialog 
          size={this.props.app.modalSize} 
          modalName={this.props.app.modalName} 
          open={this.props.app.modalOpen}  
          header={this.props.app.modalHeader} 
          content={this.props.app.modalContent} 
          modalClose={this.handleModalClose.bind(this)}/>
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
        setModalOpen: (modalOpen) => {
            dispatch({
                type: actionTypes.APP_MODAL_OPEN,
                payload: modalOpen
            })
        },
        setModalSize: (modalSize) => {
            dispatch({
                type: actionTypes.APP_MODAL_SIZE,
                payload: modalSize
            })
        },
        setModalName: (modalName) => {
            dispatch({
                type: actionTypes.APP_MODAL_NAME,
                payload: modalName
            })
        },
        setModalHeader: (modalHeader) => {
            dispatch({
                type: actionTypes.APP_MODAL_HEADER,
                payload: modalHeader
            })
        },
        setModalContent: (modalContent) => {
            dispatch({
                type: actionTypes.APP_MODAL_CONTENT,
                payload: modalContent
            })
        },
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