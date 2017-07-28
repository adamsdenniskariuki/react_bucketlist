import React, { Component } from 'react';
import { 
    Container,
    Header, 
    Label, 
    Button, 
    Form } from 'semantic-ui-react'

class SearchBucketlists extends Component {

    static defaultProps = {

    }

    handleSubmit(e){
        if(this.refs.search.value === '' && this.refs.limit.value === ''){
            alert('search value is required')
        }else{
            
        }
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
                 <input style={{"width":"30%", "marginRight":"10px"}} type="text" ref="search" placeholder="Search..." />
                 <input style={{"width":"30%", "marginRight":"10px"}} type="text" ref="limit" placeholder="Limit..."  />
                 <Button primary type="submit">Submit</Button>
            </div><br />
        </Form>
        </Container>
      </div>
    );
  }
}

export default SearchBucketlists;
