"use strict";

import alt from '../alt/alt.js.jsx';

import requestActions from '../actions/request_actions';
import requestSource from '../sources/request_source';

class RequestStore{
  constructor(){
    this.requested=[];
    this.relevant=[];
    this.bindActions(requestActions);
    this.registerAsync(requestSource);
  }
  
  updateRequested(requested){
    this.requested=requested;
  }
  
  updateRelevant(relevant){
    this.relevant=relevant;
  }
  
  deleteRequest(deleteData){
    console.log("store delete");
    this.getInstance().fetchRequested(deleteData.userId);
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(RequestStore);
