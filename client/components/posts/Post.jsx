'use strict';

import React from 'react';
import postStore from '../../stores/post_store';
import Loading from '../Loading.jsx';
import ReactMarkdown from 'react-markdown';
import DateLabel from '../date/DateLabel.jsx';

export default React.createClass({
  getInitialState(){
    return {
      currentPost: null
    };
  },
  
  componentDidMount(){
    postStore.listen(this.handlePostStoreChange);
    postStore.fetchCurrentPost(this.props.params.postId);
  },
  
  componentWillUnmount() {
    postStore.unlisten(this.handlePostStoreChange);
  },
  
  handlePostStoreChange(state){
    this.setState({
      currentPost: state.currentPost
    });
  },
  
  render(){
    if(!this.state.currentPost){
      return <Loading></Loading>;
    }
    return <div>
      <h1>{this.state.currentPost.title}</h1>
      <div>
        <i className='icon ion-clock'></i> <DateLabel date={this.state.currentPost.created_at}></DateLabel>
      </div>
      <h4>
        <ReactMarkdown source={this.state.currentPost.short_text}></ReactMarkdown>
      </h4>
      <div>
        <ReactMarkdown source={this.state.currentPost.text}></ReactMarkdown>
      </div>
    </div>;
  }
});
