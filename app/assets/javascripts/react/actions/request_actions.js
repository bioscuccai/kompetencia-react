"use strict";

import alt from '../alt/alt';
import axios from 'axios';

class RequestActions{
  constructor(){
    this.generateActions("error", "updateRequested", "updateRelevant", "updateCollisions", "resetCollisions");
  }
  
  createRequest(userId, targetId, startsAt, endsAt, chance, title, comment){
    return dispatch=>{
      axios.post(`/users/${userId}/person_requests`, {
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
        return dispatch({
          userId,
          targetId,
          startsAt,
          endsAt,
          chance,
          title,
          comment
        });
      });
    };
  }
  
  deleteRequest(userId, requestId, requesterId){
    return dispatch=>{
      axios.delete(`/users/${userId}/person_requests/${requestId}.json`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId,
          requestId,
          requesterId
        });
      });
    };
  }
  
  acceptRequest(userId, requestId, requesterId){
    return dispatch=>{
      axios.post(`/users/${userId}/person_requests/${requestId}/accept`)
      .then(data=>{
        return dispatch({
          userId,
          requestId,
          requesterId
        });
      });
    };
  }
  
  acceptRequestNoCollisions(userId, requestId, requesterId){
    return dispatch=>{
      axios.post(`/users/${userId}/person_requests/${requestId}/accept_no_collision`)
      .then(data=>{
        return dispatch({
          userId,
          requestId,
          requesterId
        });
      });
    };
  }
  
  rejectRequest(userId, requestId, requesterId){
    return dispatch=>{
      axios.post(`/users/${userId}/person_requests/${requestId}/reject`)
      .then(data=>{
        return dispatch({
          userId,
          requestId,
          requesterId
        });
      });
    };
  }
}

export default alt.createActions(RequestActions);
