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
        'float':'left', 
        'width': '50%', 
        'marginTop': '2%', 
        'padding': '10px', 
        'border': 0
    }
}

class AddBucketlist extends Component {
    
    addAlert = this.addAlert.bind(this);
    addAlert(title, message, containerType){
        if(containerType === 'success'){
            this.refs.container.success(message, title, { timeOut: 3000, closeButton:true });
        }else{
            this.refs.container.error(message, title, { timeOut: 3000, closeButton:true });
        }  
    }

    handleSubmit(e){
        if(this.refs.name.value === ''){
            this.addAlert('Error', 'The bucket list name is required', 'error');
        }else{
            axios.post('http://localhost:5555/api/v1/bucketlists',
            {'name': this.refs.name.value},
            {headers: {'Authorization':'Bearer ' + localStorage.getItem('login_token')}})
            .then( (response) => {
                if(response.data['messages'] === 'create_success'){
                    this.props.setNewBucket(response.data.bucketlists)
                    this.props.addBucketlist(this.props.bucket.bucketlists)
                    this.addAlert('Bucket list Creation', 'Bucket list successfully created', 'success');
                }else{
                    this.addAlert('Error', response.data['messages'], 'error');
                }
            })
        }
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
        <Header as="h3">Add Bucket list</Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                <Form.Field>
                 <input style={{"width":"70%", "marginRight":"10px"}} type="text" ref="name" placeholder="New Bucket list..." />
                 <Button primary type="submit">Submit</Button>
                </Form.Field>
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
        setNewBucket: (newbucket) => {
            dispatch({
                type: actionTypes.NEW_BUCKET,
                payload: newbucket
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBucketlist);
