import React, { Component } from 'react';

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
        <h3>Add Bucket list</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                 <label>Name </label>
                 <input type="text" ref="name" />
                 <input type="submit" value="Submit" />
            </div><br />
        </form>
      </div>
    );
  }
}

export default AddBucketlist;
