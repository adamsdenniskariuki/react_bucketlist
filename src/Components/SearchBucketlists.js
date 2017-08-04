import React, { Component } from 'react';
import { 
    Container,
    Header, 
    Button, 
    Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionTypes from '../Actions/ActionTypes';

var axios = require('axios');
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const styles = {
    container: {
        'float':'right', 
        'width': '40%', 
        'margin':'0', 
        'marginTop': '2%',
        'padding': '10px', 
        'border': 0
    },
    textFields: {
        "width":"25%", 
        "marginRight":"10px"
    }
}

class SearchBucketlists extends Component {

    addAlert = this.addAlert.bind(this);
    addAlert(title, message, containerType){
        if(containerType === 'success'){
            this.refs.container.success(message, title, { timeOut: 3000, closeButton:true });
        }else{
            this.refs.container.error(message, title, { timeOut: 1000, closeButton:true });
        }  
    }

    handleSubmit(e){

        let limit = 0;
        this.refs.limit.value.replace(" ", "").length === 0 ? limit = 10 : limit = this.refs.limit.value
        axios.get('http://localhost:5555/api/v1/bucketlists?q=' + this.refs.search.value + '&limit=' + limit,
        {headers: {'Authorization':'Bearer ' + localStorage.getItem('login_token')}})
        .then( (response) => {
            if(response.data['messages'] === 'list_success'){
                if(response.data.bucketlists.length === 0){
                    this.addAlert('Error', this.refs.search.value + " not found", 'error');
                    return false
                }
                this.props.setSearchBuckets(response.data.bucketlists)
                this.props.searchBucketlist(this.props.bucket.bucketlists)
            }else{
                this.addAlert('Error', response.data['messages'], 'error');
            }
        })
        
        e.preventDefault()
    }

  render() {
    return (
      <div>
        <div>
            <ToastContainer ref="container"
                            toastMessageFactory={ToastMessageFactory}
                            className="toast-top-right" />
        </div>
        <Container fluid style={styles.container}>
        <Header as="h3">Search Bucket lists</Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                 <input onKeyUp={this.handleSubmit.bind(this)} style={styles.textFields} type="text" ref="search" placeholder="Search..." />
                 <input onKeyUp={this.handleSubmit.bind(this)} style={styles.textFields} type="text" ref="limit" placeholder="Limit..."  />
                 <Button primary type="submit">Submit</Button>
            </div><br />
        </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        bucket: state.bucketListReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchBuckets: (buckets) => {
            dispatch({
                type: actionTypes.LIST_BUCKETS,
                payload: buckets
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBucketlists);