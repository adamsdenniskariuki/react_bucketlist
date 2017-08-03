import React, { Component } from 'react';
import { 
    Container,
    Header, 
    Button, 
    Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionTypes from '../Actions/ActionTypes';

var axios = require('axios');

class SearchBucketlists extends Component {

    handleSubmit(e){

        let limit = 0;
        this.refs.limit.value.replace(" ", "").length === 0 ? limit = 10 : limit = this.refs.limit.value
        axios.get('http://localhost:5555/api/v1/bucketlists?q=' + this.refs.search.value + '&limit=' + limit,
        {headers: {'Authorization':'Bearer ' + localStorage.getItem('login_token')}})
        .then( (response) => {
            if(response.data['messages'] === 'list_success'){
                this.props.setSearchBuckets(response.data.bucketlists)
                this.props.searchBucketlist(this.props.bucket.bucketlists)
            }else{
                alert(response.data['messages'])
            }
        })
        
        e.preventDefault()
    }

  render() {
    return (
      <div>
        <Container fluid style={
            {'float':'right', 'width': '49%', 'margin':'0', 'marginTop': '5%', 'padding': '10px', 'border': '1px solid #e8e8e8'}}>
        <Header as="h3">Search Bucket lists</Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                 <input onKeyUp={this.handleSubmit.bind(this)} style={{"width":"30%", "marginRight":"10px"}} type="text" ref="search" placeholder="Search..." />
                 <input onKeyUp={this.handleSubmit.bind(this)} style={{"width":"30%", "marginRight":"10px"}} type="text" ref="limit" placeholder="Limit..."  />
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