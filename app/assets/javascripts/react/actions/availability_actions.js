"use strict";

import alt from '../alt/alt';
import axios from 'axios';

class AvailabilityActions{
  constructor(){
    this.generateActions("error", "updateAvailabilities");
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
}

export default alt.createActions(AvailabilityActions);
