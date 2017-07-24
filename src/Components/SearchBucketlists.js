import React, { Component } from 'react';


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
        <h3>Search Bucket lists</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
                 <label>Search </label>
                 <input type="text" ref="search" />
                 <label> Limit </label>
                 <input type="text" ref="limit" />
                 <input type="submit" value="Submit" />
            </div><br />
        </form>
      </div>
    );
  }
}

export default SearchBucketlists;
