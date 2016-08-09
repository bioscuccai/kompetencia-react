'use strict';

import React from 'react';
import PostPreview from './PostPreview.jsx';
import NewPostButton from './NewPostButton.jsx';

import postStore from '../../stores/post_store';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  getInitialState(){
    return {
      posts: [],
      page: 0,
      pageCount: 0
    };
  },
  
  componentDidMount(){
    postStore.listen(this.handlePostStoreChange);
    postStore.fetchPosts();
  },
  
  componentWillUnmount(){
    postStore.unlisten(this.handlePostStoreChange);
  },
  
  handlePostStoreChange(state){
    this.setState({
      posts: state.posts
    });
  },
  
  render(){
    return <div>
      <div>
        <NewPostButton currentUser={this.context.currentUser}></NewPostButton>
      </div>
      <h1>Bejelentések</h1>
      {this.state.posts.map(post=>{
        return <PostPreview
          post={post}
          currentUser={this.context.currentUser}
          key={`post-preview-${post.id}`}></PostPreview>;
      })}
    </div>;
  }
});
