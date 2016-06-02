"use strict";

import alt from '../alt/alt';
import userActions from '../actions/user_actions';
import competenceActions from '../actions/competence_actions';
import userSource from '../sources/user_source';

class UserStore{
  constructor(){
    this.allUsers=[];
    this.profileUser=null;
    this.subordinates=[];
    this.godfathers=[];
    this.bindActions(userActions);
    this.bindListeners({
      reloadUsers: [
        userActions.ADD_SUBORDINATE_SUCC,
        userActions.REMOVE_SUBORDINATE_SUCC,
        userActions.MAKE_ADMIN_SUCC,
        userActions.REVOKE_ADMIN_SUCC,
        userActions.MAKE_GODFATHER_SUCC,
        userActions.REVOKE_GODFATHER_SUCC
      ],
      reloadProfileUser: [
        competenceActions.ADD_SKILL_SUCC,
        competenceActions.REMOVE_SKILL_SUCC,
        competenceActions.CONFIRM_SKILL_SUCC,
        userActions.EDIT_USER_SUCC
      ]
    });
    this.registerAsync(userSource);
  }
  
  reloadProfileUser(data){
    this.getInstance().fetchProfileUser(data.userId);
    return false;
  }
  
  reloadUsers(){
    this.getInstance().fetchAllUsers();
    return false;
  }
  
  updateAllUsers(allUsers){
    this.allUsers=allUsers;
  }
  
  updateProfileUser(profileUser){
    this.profileUser=profileUser;
  }
  
  updateGodfathers(godfathers){
    this.godfathers=godfathers;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(UserStore, "userStore");
