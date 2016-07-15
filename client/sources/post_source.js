'use strict';

import axios from 'axios';
import postActions from '../actions/post_actions';


export default {
  fetchPosts: {
    remote(state, page=0){
      return new Promise((resolve, reject) => {
        axios.get(`/posts?page.json=${page}`, {responseType: 'json'})
        .then(data=>{
          resolve(data.data);
        });
      });
    },
    success: postActions.updatePosts,
    error: postActions.error
  }
};
