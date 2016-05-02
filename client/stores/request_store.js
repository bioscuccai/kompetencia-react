"use strict";

import alt from '../alt/alt';

import requestActions from '../actions/request_actions';
import requestSource from '../sources/request_source';

class RequestStore{
  constructor(){
    this.requested=[];
    this.relevant=[];
    this.collisions=[];
    this.bindActions(requestActions);
    this.bindListeners({
      reloadRelevant: [
        requestActions.ACCEPT_REQUEST_SUCC,
        requestActions.ACCEPT_REQUEST_NO_COLLISIONS_SUCC,
        requestActions.REJECT_REQUEST_SUCC
      ],
      reloadRequests: [
        requestActions.DELETE_REQUEST_SUCC,
        requestActions.UPDATE_REQUEST_SUCC
      ]
    });
    this.registerAsync(requestSource);
  }
  
  reloadRequests(rData){
    this.getInstance().fetchRequested(rData.userId);
    return false;
  }
  
  reloadRelevant(rData){
    this.getInstance().fetchRelevant(rData.requesterId);
    return false;
  }
  
  updateRequested(requested){
    this.requested=requested;
  }
  
  updateRelevant(relevant){
    this.relevant=relevant;
  }
  
  updateCollisions(collisions){
    this.collisions=collisions;
  }
  
  resetCollisions(){
    this.collisions=[];
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(RequestStore, "requestStore");
