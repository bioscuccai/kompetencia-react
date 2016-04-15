"use strict";

import alt from '../alt/alt.js.jsx';
import axios from 'axios';

class AvailabilityActions{
  updateAvailabilities(availabilities){
    return availabilities;
  }
  
  newAvailability(userId, startsAt, endsAt, comment){
    return dispatch=>{
      axios.post(`/users/${userId}/availabilities.json`, {
        availability: {
          starts_at: startsAt,
          ends_at: endsAt,
          comment
        }
      }, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId,
          startsAt,
          endsAt,
          comment
        });
      });
    };
  }
  
  error(err){
    return err;
  }
}

export default alt.createActions(AvailabilityActions);
