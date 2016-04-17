"use strict";

import axios from 'axios';

import userActions from '../actions/user_actions.js.jsx';

export default {
  fetchAllUsers: {
    remote(){
      return new Promise((resolve, reject) => {
        axios.get('/users.json',{
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateAllUsers,
    error: userActions.error
  },
  
  fetchSubordinates: {
    remote(state, userId){
      return new Promise(function(resolve, reject) {
        axios.get(`/users/${userId}/subordinates.json`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateSubordinates,
    error: userActions.error
  }
};