'use strict';

import alt from '../alt/alt';
import postActions from '../actions/post_actions';
import postSource from '../sources/post_source';

class PostStore{
  contructor(){
    this.posts=[];
    this.currentPost=null;
    this.bindActions(postActions);
    this.registerAsync(postSource);
  }
  
  reloadPosts(){
    this.getInstance().fetchPosts();
    return false;
  }
  
  updatePosts(posts){
    this.posts=posts;
  }
  
  updateCurrentPost(currentPost){
    this.currentPost=currentPost;
  }
  
  error(e){
    console.log(e);
  }
}

export default alt.createStore(PostStore, 'postStore');
