import React, { Component } from 'react';
import { Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionTypes from '../Actions/ActionTypes';

const styles = {
    pagination: {
        'position': 'absolute', 
        'marginLeft': '69%', 
        'marginTop': '5%'
    }
}

class Paginate extends Component {

  render() {
    return (
      <div style={styles.pagination}>
       <Button id="closeButton" color='black'>Prev</Button>
       <Button id="closeButton" color='black'>Next</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
