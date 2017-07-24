import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class BucketlistData extends Component {
  
  deleteBucketlist(id){
    // console.log('test')
    this.props.onDelete(id)
  }
  
  render() {
    return (
      <li className="Bucketlists">
        <strong>{this.props.bucketlist.name}</strong> - {this.props.bucketlist.name} <Link onClick={this.deleteBucketlist.bind(this, this.props.bucketlist.id)} to="/">X</Link>
      </li>
    );
  }
}

export default BucketlistData;
