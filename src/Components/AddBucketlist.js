import React, { Component } from 'react';
import { 
    Container,
    Header, 
    Label, 
    Button, 
    Form } from 'semantic-ui-react'

var axios = require('axios');

class AddBucketlist extends Component {

    constructor(){
        super();
        this.state = {
            newBucketlist: {}
        }
    }

    static defaultProps = {

    }

    handleSubmit(e){
        if(this.refs.name.value === ''){
            alert('name is required')
        }else{
            axios.post('http://localhost:5555/api/v1/bucketlists',
            {'name': this.refs.name.value},
            {headers: {'Authorization':'Bearer ' + localStorage.getItem('login_token')}})
            .then( (response) => {
                if(response.data['messages'] === 'create_success'){
                    this.setState({newBucketlist: response.data.bucketlists}, function(){
                        this.props.addBucketlist(this.state.newBucketlist)
                    })
                    alert('Bucket list successfully created');
                }else{
                    alert(response.data['messages'])
                }
            })
        }
        e.preventDefault()
    }

  render() {
    return (
      <div>
        <Container fluid style={
            {'float':'left', 'width': '49%', 'marginTop': '5%', 'padding': '10px', 'border': '1px solid #e8e8e8'}}>
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

export default AddBucketlist;
