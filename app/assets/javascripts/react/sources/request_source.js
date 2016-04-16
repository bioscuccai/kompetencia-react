"use strict";

import requestActions from '../actions/request_actions';
import axios from 'axios';

export default {
  fetchRelevant: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}/person_requests/relevant`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: requestActions.updateRelevant,
    error: requestActions.error
  },
  
  fetchRequested: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}/person_requests.json`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: requestActions.updateRequested,
    error: requestActions.error
  }
};
