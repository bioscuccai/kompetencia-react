"use strict";

import alt from '../alt/alt';
import userActions from '../actions/user_actions';
import userSource from '../sources/user_source';

class UserStore{
  constructor(){
    this.allUsers=[];
    this.subordinates=[];
    this.bindActions(userActions);
    this.bindListeners({
      reloadUsers: [
        userActions.ADD_SUBORDINATE,
        userActions.REMOVE_SUBORDINATE
      ]
    });
    this.registerAsync(userSource);
  }
  
  reloadUsers(){
    this.getInstance().fetchAllUsers();
    return false;
  }
  
  updateAllUsers(allUsers){
    this.allUsers=allUsers;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(UserStore);
