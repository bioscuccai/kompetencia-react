"use strict";

import alt from '../alt/alt';
import userActions from '../actions/user_actions';
import userSource from '../sources/user_source';

class UserStore{
  constructor(){
    this.allUsers=[];
    this.subordinates=[];
    this.bindActions(userActions);
    this.registerAsync(userSource);
  }
  
  addSubordinate(){
    this.getInstance().fetchAllUsers();
  }
  
  removeSubordinate(){
    this.getInstance().fetchAllUsers();
  }
  
  updateAllUsers(allUsers){
    this.allUsers=allUsers;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(UserStore);
