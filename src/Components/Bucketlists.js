import React, { Component } from 'react';
import BucketlistData from './BucketlistData';


class Bucketlists extends Component {

updateBucketlist(id){
    this.props.onUpdate(id)
}

deleteBucketlist(id){
    this.props.onDelete(id)
}

addItem(id){
    this.props.addItem(id)
}

viewItem(id){
    this.props.viewItem(id)
}

  render() {
      let allbucketlists;
        if(this.props.bucketlists){
            allbucketlists = this.props.bucketlists.map(bucketlist => {
                // console.log(bucketlist)
                return (
                    <BucketlistData viewItem={this.viewItem.bind(this)} addItem={this.addItem.bind(this)} onUpdate={this.updateBucketlist.bind(this)} onDelete={this.deleteBucketlist.bind(this)} key={bucketlist.id} bucketlist={bucketlist}/>
                )
            });
        }
    return (
      <div className="Bucketlists">
        {allbucketlists}
      </div>
    );
  }
}

export default Bucketlists;
