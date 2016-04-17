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
  },
  
  fetchCollisions: {
    remote(state, targetId, startsAt, endsAt){
      return new Promise((resolve, reject) => {
        axios.post(`/users/${targetId}/person_requests/collisions`, {
          target_id: targetId,
          starts_at: startsAt,
          ends_at: endsAt
        },{
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: requestActions.updateCollisions,
    error: requestActions.error
  }
};
