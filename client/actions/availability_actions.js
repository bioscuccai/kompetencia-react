"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class AvailabilityActions{
  constructor(){
    this.generateActions("error", "updateAvailabilities", "updateGodfatherAvailabilities",
      "setUserId", "setGodfatherId", "updateRecentAvailabilities",
    
      "newAvailabilitySucc", "deleteAvailabilitySucc", "editAvailabilitySucc",
      "turnOffAvailabilitySucc", "turnOnAvailabilitySucc");
  }
  
  newAvailability(userId, startsAt, endsAt, comment, godfatherMode=false){
    return dispatch=>{
      let resp={ userId, startsAt, endsAt, comment };
      dispatch(resp);
      return axios.post(`/users/${userId}/availabilities.json`, {
        availability: {
          starts_at: startsAt,
          ends_at: endsAt,
          comment
        }
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.newAvailabilitySucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  deleteAvailability(userId, availabilityId, godfatherMode=false){
    return dispatch=>{
      let resp={ userId, availabilityId };
      dispatch(resp);
      return axios.delete(`/users/${userId}/availabilities/${availabilityId}.json`, {
        responseType: 'json'
      })
      .then(data=>{
        this.deleteAvailabilitySucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  turnOffAvailability(userId, availabilityId, godfatherMode=false){
    return dispatch=>{
      let resp={ userId, availabilityId };
      dispatch(resp);
      return axios.post(`/users/${userId}/availabilities/${availabilityId}/turn_off`)
      .then(data=>{
        this.turnOffAvailabilitySucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  turnOnAvailability(userId, availabilityId, godfatherMode=false){
    return dispatch=>{
      let resp={ userId, availabilityId };
      dispatch(resp);
      return axios.post(`/users/${userId}/availabilities/${availabilityId}/turn_on`)
      .then(data=>{
        this.turnOnAvailabilitySucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  editAvailability(userId, availabilityId, startsAt, endsAt, comment){
    return dispatch=>{
      let resp={ userId, availabilityId };
      dispatch(resp);
      return axios.put(`/users/${userId}/availabilities/${availabilityId}.json`, {
        availability: {
          starts_at: startsAt,
          ends_at: endsAt,
          comment
        }
      },{
        responseType: 'json'
      })
      .then(data=>{
        this.editAvailabilitySucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(AvailabilityActions);
