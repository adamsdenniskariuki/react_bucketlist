import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Card, Icon} from 'semantic-ui-react';

const styles = {
  cards: {
    'width': '40%', 
    'float': 'left', 
    'margin': '10px',
    'padding': '30px',
    'textTransform': 'uppercase',
    'backgroundColor': '#fff',
    'boxShadow': '0px 0px 5px #888888'
  },
  bucketTitle: {
    'fontWeight': 'bold'
  },
  addLink:{
    'color': '#fff',
    'fontSize': '13px',
    'backgroundColor': '#21BA45',
    'padding': '8px',
    'float': 'left',
    'borderRadius': '5px',
    'marginTop': '4.6%'
    
  },
  viewLink:{
    'color': '#fff',
    'fontSize': '13px',
    'backgroundColor': '#21BA45',
    'padding': '8px',
    'float': 'right',
    'borderRadius': '5px',
    'marginRight': '57%'
    
  },
  updateLink: {
    'color':'blue',
    'position': 'absolute',
    'marginLeft': '80%',
    'marginTop': '-8%'
  },
  deleteLink: {
    'color':'blue',
    'position': 'absolute',
    'marginLeft': '85%',
    'marginTop': '-8%',
  }
}

class BucketlistData extends Component {
  
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
    return (
      <div className="Bucketlists">
        <Card style={styles.cards}>
          <Card.Content>
            <Link style={styles.updateLink} onClick={this.updateBucketlist.bind(this, this.props.bucketlist.id)} to="/"><Icon name='edit' /></Link> 
            <Link style={styles.deleteLink} onClick={this.deleteBucketlist.bind(this, this.props.bucketlist.id)} to="/"><Icon name='delete' /></Link>
            <div style={styles.bucketTitle}>{this.props.bucketlist.name}</div><br /> 
            <div>Date Created: {this.props.bucketlist.date_created}</div>
            <div style={{'width':'100%'}}> 
              <Link onClick={this.addItem.bind(this, this.props.bucketlist.id)} style={styles.addLink} to="/">Add Item</Link> <br />
              <Link onClick={this.viewItem.bind(this, this.props.bucketlist.id)} style={styles.viewLink} to="/">View Items</Link> <br />
            </div>
          </Card.Content>
        </Card>
      </div>
      
    );
  }
}

export default BucketlistData;
