"use strict";

import alt from '../alt/alt.js.jsx';
import availabilitySource from '../sources/availability_source.js.jsx';
import availabilityActions from '../actions/availability_actions.js.jsx';

class AvailabilityStore{
  constructor(){
    this.availabilities=[];
    
    this.bindActions(availabilityActions);
    this.registerAsync(availabilitySource);
  }
  
  updateAvailabilities(availabilities){
    this.availabilities=availabilities;
  }
  
  newAvailability(naData){
    this.getInstance().fetchAvailabilities(naData.userId);
  }
}

export default alt.createStore(AvailabilityStore);
