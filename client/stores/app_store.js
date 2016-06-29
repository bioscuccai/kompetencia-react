import alt from '../alt/alt';

import appActions from '../actions/app_actions';
import appSource from '../sources/app_source';
import userActions from '../actions/user_actions';

class AppStore{
  constructor(){
    this.unreadNotifications=[];
    this.currentUser=null;
    this.stats={};
    this.bindActions(appActions);
    this.registerAsync(appSource);
    this.bindListeners({
      reloadCurrentUser: [
        userActions.EDIT_USER_SUCC,
        userActions.REVOKE_ADMIN_SUCC,
        userActions.REVOKE_GODFATHER_SUCC,
        userActions.MAKE_ADMIN_SUCC,
        userActions.MAKE_GODFATHER_SUCC
      ]
    });
  }
  
  updateCurrentUser(currentUser){
    this.currentUser=currentUser;
  }
  
  reloadCurrentUser(){
    if(this.currentUser){
      this.getInstance().fetchCurrentUser(this.currentUser.id);
    }
    return false;
  }
  
  updateStats(stats){
    this.stats=stats;
  }
  
  error(e){
    console.log(e);
  }
}

export default alt.createStore(AppStore, "appStore");
