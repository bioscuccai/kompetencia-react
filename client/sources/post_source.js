'use strict';

import axios from 'axios';
import postActions from '../actions/post_actions';

export default {
  fetchPosts: {
    remote(state, page=0){
      return new Promise((resolve, reject) => {
        axios.get(`/posts.json`, {responseType: 'json'})
        .then(data=>{
          resolve(data.data);
        });
      });
    },
    success: postActions.updatePosts,
    error: postActions.error
  },
  
  fetchCurrentPost: {
    remote(state, id){
      return new Promise((resolve, reject) => {
        axios.get(`/posts/${id}.json`)
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: postActions.updateCurrentPost,
    error: postActions.error
  }
};
