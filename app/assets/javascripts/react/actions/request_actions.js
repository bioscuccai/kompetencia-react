"use strict";

import alt from '../alt/alt.js.jsx';
import axios from 'axios';

class RequestActions{
  updateRequested(requests){
    return requests;
  }
  
  updateRelevant(relevant){
    return relevant;
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
  
  deleteRequest(userId, requestId){
    return dispatch=>{
      axios.delete(`/users/${userId}/person_requests/${requestId}.json`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId,
          requestId
        });
      });
    };
  }
  
  error(err){
    return err;
  }
}

export default alt.createActions(RequestActions);
