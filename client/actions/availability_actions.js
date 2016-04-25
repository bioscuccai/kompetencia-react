"use strict";

import alt from '../alt/alt';
import axios from 'axios';

class AvailabilityActions{
  constructor(){
    this.generateActions("error", "updateAvailabilities", "updateGodfatherAvailabilities",
      "setUserId", "setGodfatherId", "updateRecentAvailabilities");
  }
  
  newAvailability(userId, startsAt, endsAt, comment, godfatherMode=false){
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
  
  deleteAvailability(userId, availabilityId, godfatherMode=false){
    return dispatch=>{
      axios.delete(`/users/${userId}/availabilities/${availabilityId}.json`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId,
          availabilityId
        });
      });
    };
  }
  
  turnOffAvailability(userId, availabilityId, godfatherMode=false){
    return dispatch=>{
      axios.post(`/users/${userId}/availabilities/${availabilityId}/turn_off`)
      .then(data=>{
        return dispatch({
          userId,
          availabilityId
        });
      });
    };
  }
  
  turnOnAvailability(userId, availabilityId, godfatherMode=false){
    return dispatch=>{
      axios.post(`/users/${userId}/availabilities/${availabilityId}/turn_on`)
      .then(data=>{
        return dispatch({
          userId,
          availabilityId
        });
      });
    };
  }
  
  editAvailability(userId, availabilityId, startsAt, endsAt, comment){
    console.log("edit");
    return dispatch=>{
      console.log("in dispatch");
      axios.put(`/users/${userId}/availabilities/${availabilityId}.json`, {
        availability: {
          starts_at: startsAt,
          ends_at: endsAt,
          comment
        }
      },{
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId,
          availabilityId
        });
      });
    };
  }
}

export default alt.createActions(AvailabilityActions);
