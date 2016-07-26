'use strict';

import alt from '../alt/alt';
import _ from 'lodash';
import axios from 'axios';

class PostActions{
  constructor(){
    this.generateActions("error", "updatePosts", "updateCurrentPost", "createPostSucc", "updatePostSucc");
  }
  
  createPost(title, shortText, text, published=true, frontPage=false, important=false){
    let resp={title, shortText, text, published, frontPage, important};
    return dispatch=>{
      return axios.post("/posts", {
        post: {
          title,
          short_text: shortText,
          text,
          published,
          front_page: frontPage,
          important
        }
      })
      .then(data=>{
        this.createPostSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updatePost(id, title, shortText, text, published=true, frontPage=true, important=false){
    let resp={id, title, shortText, text, published, frontPage, important};
    return dispatch=>{
      return axios.put(`/posts/${id}.json`, {
        post: {
          title,
          short_text: shortText,
          text,
          published,
          front_page: frontPage,
          important
        }
      })
      .then(data=>{
        this.updatePostSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(PostActions);