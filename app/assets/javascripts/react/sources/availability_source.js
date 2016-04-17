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
  }
};
