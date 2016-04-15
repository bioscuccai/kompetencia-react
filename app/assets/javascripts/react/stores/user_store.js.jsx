"use strict";

import alt from '../alt/alt.js.jsx';
import userActions from '../actions/user_actions.js.jsx';
import userSource from '../sources/user_source.js.jsx';

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
