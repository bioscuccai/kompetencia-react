import alt from '../alt/alt';

import competenceTierActions from '../actions/competence_tier_actions';
import competenceActions from '../actions/competence_actions';
import competenceTypeActions from '../actions/competence_type_actions';
import userActions from '../actions/user_actions';
import requestActions from '../actions/request_actions';
import availabilityActions from '../actions/availability_actions';

class AppStore{
  constructor(){
    this.unreadNotifications=[];
    this.bindListeners({
      error: [
        competenceTypeActions.ERROR,
        competenceActions.ERROR,
        competenceTierActions.ERROR,
        userActions.ERROR,
        requestActions.ERROR,
        availabilityActions.ERROR
      ],
      
      //user
      makeAdminSucc: userActions.MAKE_ADMIN_SUCC,
      revokeAdminSucc: userActions.REVOKE_ADMIN_SUCC,
      makeGodfatherSucc: userActions.MAKE_GODFATHER_SUCC,
      revokeGodfatherSucc: userActions.REVOKE_GODFATHER_SUCC,
      addSubordinateSucc: userActions.ADD_SUBORDINATE_SUCC,
      removeSubordinateSucc: userActions.REMOVE_SUBORDINATE_SUCC,
      
      //availability
      newAvailabilitySucc: availabilityActions.NEW_AVAILABILITY_SUCC,
      deleteAvailabilitySucc: availabilityActions.DELETE_AVAILABILITY_SUCC,
      editAvailabilitySucc: availabilityActions.EDIT_AVAILABILITY_SUCC,
      turnOnAvailabilitySucc: availabilityActions.TURN_ON_AVAILABILITY_SUCC,
      turnOffAvailabilitySucc: availabilityActions.TURN_OFF_AVAILABILITY_SUCC,
      
      //request
      createRequestSucc: requestActions.CREATE_REQUEST_SUCC,
      updateRequestSucc: requestActions.UPDATE_REQUEST_SUCC,
      deleteRequestSucc: requestActions.DELETE_REQUEST_SUCC,
      acceptRequestSucc: requestActions.ACCEPT_REQUEST_SUCC,
      acceptRequestNoCollisionsSucc: requestActions.ACCEPT_REQUEST_NO_COLLISIONS_SUCC,
      rejectRequestSucc: requestActions.REJECT_REQUEST_SUCC
    });
  }
  
  cullNofitications(){
    this.unreadNotifications=[];
  }
  
  makeAdminSucc(){
    this.unreadNotifications.push({
      type: 'SUCC',
      message: ''
    });
  }
  revokeAdminSucc(){
    this.unreadNotifications.push({
      type: 'SUCC',
      message: ''
    });
  }
  makeGodfatherSucc(){
    this.unreadNotifications.push({
      type: 'SUCC',
      message: ''
    });
  }
  revokeGodfatherSucc(){
    this.unreadNotifications.push({
      type: 'SUCC',
      message: ''
    });
  }

  error(e){
    this.unreadNotifications.push({
      type: 'ERROR',
      message: `Hiba történt: ${JSON.stringify(e)}`
    });
  }
}

export default alt.createStore(AppStore, "appStore");
