'use strict';

import React from 'react';

export default React.createClass({
  getInitialState(){
    return {
      posts: [],
      page: 0,
      pageCount: 0
    };
  },
  
  componentDidMount(){
    
  },
  
  componentWillUnmount(){
    
  },
  
  handlePostStoreChage(state){
    this.setState({
      posts: state.posts
    });
  },
  
  render(){
    return <div>
      
    </div>;
  }
});
