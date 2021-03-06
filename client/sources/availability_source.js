"use strict";

import availabilityActions from '../actions/availability_actions';
import axios from 'axios';

export default {
  fetchAvailabilities: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}/availabilities.json`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: availabilityActions.updateAvailabilities,
    error: availabilityActions.error
  },
  
  fetchGodfatherAvailabilities: {
    remote(state, godfatherId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${godfatherId}/availabilities/godfather_availabilities`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: availabilityActions.updateGodfatherAvailabilities,
    error: availabilityActions.error
  },
  
  fetchRecent: {
    remote(state){
      return new Promise((resolve, reject) => {
        axios.get('/availabilities/recent', {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: availabilityActions.updateRecentAvailabilities,
    error: availabilityActions.error
  }
};
