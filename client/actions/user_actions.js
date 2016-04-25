"use strict";

import alt from '../alt/alt';
import axios from 'axios';

class UserActions{
  constructor(){
    this.generateActions("error", "updateAllUsers", "updateSubordinates", "updateProfileUser");
  }
  
  //ezek a felhasznalonak a keresztapjat allitjak be
  //nem pedig a keresztapa ala adnak egy kovetot
  addSubordinate(userId, subId){
    console.log(arguments);
    return dispatch=>{
      axios.post(`/users/${subId}/add_godfather`, {
        godfather_id: userId
      }, {
        responseType: 'json'
      })
      .then(data=>{
        dispatch({
          userId,
          subId
        });
      });
    };
  }
  
  removeSubordinate(userId, subId){
    return dispatch=>{
      axios.post(`/users/${subId}/remove_godfather`,{}, {
        responseType: 'json'
      })
      .then(data=>{
        dispatch({
          userId,
          subId
        });
      });
    };
  }
  
  makeAdmin(userId){
    return dispatch=>{
      axios.get(`/users/${userId}/make_admin`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId
        });
      });
    };
  }
  
  revokeAdmin(userId){
    return dispatch=>{
      axios.get(`/users/${userId}/revoke_admin`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId
        });
      });
    };
  }
  
  makeGodfather(userId){
    return dispatch=>{
      axios.get(`/users/${userId}/make_godfather`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId
        });
      });
    };
  }
  
  revokeGodfather(userId){
    return dispatch=>{
      axios.get(`/users/${userId}/revoke_godfather`, {
        responseType: 'json'
      })
      .then(data=>{
        return dispatch({
          userId
        });
      });
    };
  }
}

export default alt.createActions(UserActions);
