import React, { Component } from 'react';
import BucketlistData from './BucketlistData';


class Bucketlists extends Component {

deleteBucketlist(id){
    this.props.onDelete(id)
}

  render() {
      let allbucketlists;
        if(this.props.bucketlists){
            allbucketlists = this.props.bucketlists.map(bucketlist => {
                // console.log(bucketlist)
                return (
                    <BucketlistData onDelete={this.deleteBucketlist.bind(this)} key={bucketlist.id} bucketlist={bucketlist}/>
                )
            });
        }
    return (
      <div className="Bucketlists">
          <h3>Bucket lists </h3>
        {allbucketlists}
      </div>
    );
  }
}

export default Bucketlists;
