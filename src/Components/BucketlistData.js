import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'semantic-ui-react';

class BucketlistData extends Component {
  
  deleteBucketlist(id){
    // console.log('test')
    this.props.onDelete(id)
  }
  
  render() {
    return (
      <div className="Bucketlists">
        <Card style={{'width': '40%', 'float': 'left', 'margin': '10px'}}>
          <Card.Content extra>
            {this.props.bucketlist.name} <Link style={{'color':'blue'}} to="/"> Edit</Link> <Link style={{'color':'blue'}} onClick={this.deleteBucketlist.bind(this, this.props.bucketlist.id)} to="/"> Delete</Link> <br />
            Date Created: {this.props.bucketlist.date_created}<br />
            <Link style={{'color':'blue'}} to="/">Add Item</Link> <br />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default BucketlistData;
