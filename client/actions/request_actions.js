"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class RequestActions{
  constructor(){
    this.generateActions("error", "updateRequested", "updateRelevant", "updateCollisions", "resetCollisions",
    
    "createRequestSucc", "updateRequestSucc", "deleteRequestSucc",
    "acceptRequestSucc", "acceptRequestNoCollisionsSucc", "rejectRequestSucc");
  }
  
  createRequest(userId, targetId, startsAt, endsAt, chance, title, comment){
    return dispatch=>{
      let resp={userId, targetId, startsAt, endsAt, chance, title, comment};
      dispatch(resp);
      return axios.post(`/users/${userId}/person_requests.json`, {
        person_request: {
          target_id: targetId,
          starts_at: startsAt,
          ends_at: endsAt,
          chance,
          title,
          comment
        }
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.createRequestSucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  updateRequest(userId, requestId, startsAt, endsAt, chance, title, comment){
    return dispatch=>{
      let resp={userId, requestId, startsAt, endsAt, chance, title,comment};
      dispatch(resp);
      return axios.put(`/users/${userId}/person_requests/${requestId}.json`, {
        person_request: {
          starts_at: startsAt,
          ends_at: endsAt,
          chance,
          title,
          comment
        }
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.updateRequestSucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  deleteRequest(userId, requestId, requesterId){
    return dispatch=>{
      let resp={ userId, requestId, requesterId };
      dispatch(resp);
      return axios.delete(`/users/${userId}/person_requests/${requestId}.json`, {
        responseType: 'json'
      })
      .then(data=>{
        this.deleteRequestSucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  acceptRequest(userId, requestId, requesterId){
    return dispatch=>{
      let resp={userId, requestId, requesterId};
      dispatch(resp);
      return axios.post(`/users/${userId}/person_requests/${requestId}/accept`)
      .then(data=>{
        this.acceptRequestSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  acceptRequestNoCollisions(userId, requestId, requesterId){
    return dispatch=>{
      let resp={ userId, requestId, requesterId };
      dispatch(resp);
      return axios.post(`/users/${userId}/person_requests/${requestId}/accept_no_collision`)
      .then(data=>{
        this.acceptRequestNoCollisionsSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  rejectRequest(userId, requestId, requesterId){
    return dispatch=>{
      let resp={ userId, requestId, requesterId };
      dispatch(resp);
      return axios.post(`/users/${userId}/person_requests/${requestId}/reject`)
      .then(data=>{
        this.rejectRequestSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(RequestActions);
