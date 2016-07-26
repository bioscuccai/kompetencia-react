'use strict';

import alt from '../alt/alt';
import postActions from '../actions/post_actions';
import postSource from '../sources/post_source';

class PostStore{
  constructor(){
    this.posts=[];
    this.currentPost=null;
    this.registerAsync(postSource);
    this.bindActions(postActions);
    this.bindListeners({
      reloadPosts: [
        postActions.createPostSucc,
        postActions.updatePostSucc
      ]
    });
  }
  
  reloadPosts(){
    this.getInstance().fetchPosts();
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
