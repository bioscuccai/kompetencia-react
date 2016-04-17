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
    this.registerAsync(requestSource);
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
  
  deleteRequest(deleteData){
    console.log("store delete");
    this.getInstance().fetchRequested(deleteData.userId);
  }
  
  resetCollisions(){
    this.collisions=[];
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(RequestStore);
