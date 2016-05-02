"use strict";

import alt from '../alt/alt';
import availabilitySource from '../sources/availability_source';
import availabilityActions from '../actions/availability_actions';
import _ from 'lodash';

class AvailabilityStore{
  constructor(){
    //TODO: ez valami istentelen ganyolas
    this.godfatherId=null; //ha ez be van allitva, akkor nem szur felhasznalo id-re
    this.userId=null;
    
    this.availabilities=[]; //egy felhasznaloe
    this.godfatherAvailabilities=[]; //az aktualis keresztapa osszes dolgozojanak
    this.recentAvailabilities=[];
    //technikalilag minden mehetne az elso tombbe, de igy tobbet mond
    this.bindActions(availabilityActions);
    this.bindListeners({
      refreshAvailabilities: [
          availabilityActions.NEW_AVAILABILITY_SUCC,
          availabilityActions.TURN_ON_AVAILABILITY_SUCC,
          availabilityActions.TURN_OFF_AVAILABILITY_SUCC,
          availabilityActions.EDIT_AVAILABILITY_SUCC,
          availabilityActions.DELETE_AVAILABILITY_SUCC]
    });
    this.registerAsync(availabilitySource);
  }
  
  refreshAvailabilities(refreshData){
    if(!_.isNil(this.godfatherId)){
      this.getInstance().fetchGodfatherAvailabilities(this.godfatherId);
    } else {
      this.getInstance().fetchAvailabilities(this.userId);
    }
    return false;
  }
  
  updateAvailabilities(availabilities){
    this.availabilities=availabilities;
  }
  
  updateGodfatherAvailabilities(godfatherAvailabilities){
    this.godfatherAvailabilities=godfatherAvailabilities;
  }
  
  setGodfatherId(godfatherId){
    this.godfatherId=godfatherId;
    return false;
  }
  
  setUserId(userId){
    this.userId=userId;
    return false;
  }
  
  updateRecentAvailabilities(recent){
    this.recentAvailabilities=recent;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(AvailabilityStore, "availabilityStore");
