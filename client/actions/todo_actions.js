"use strict";

import alt from '../alt/alt';
import axios from 'axios';

class TodoActions{
  constructor(){
    this.generateActions("updateTodos", "error", "tickRequested", "tick");
  }
  
  notifySeenRequested(){
    axios.get("/users/notify_seen_requested", {responseType: 'json'})
      .then(data=>{});
    return null;
  }
  
  notifySeenRelevant(){
    axios.get("/users/notify_seen_relevant", {responseType: 'json'})
      .then(data=>{});
    return null;
  }
  
  notifySeenByGodfather(userId){
    axios.get(`/users/${this.props.params.profileUserId}/notify_seen_by_godfather`, {responseType: 'json'})
    .then(data=>{});
    return userId;
  }
}

export default alt.createActions(TodoActions);
