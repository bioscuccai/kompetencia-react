"use strict";

import axios from 'axios';
import appActions from '../actions/app_actions';


export default {
  fetchCurrentUser: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}.json`, {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },

    success: appActions.updateCurrentUser,
    error: appActions.error
  }
};
