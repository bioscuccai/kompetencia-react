"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class UserActions{
  constructor(){
    this.generateActions("error", "updateAllUsers", "updateSubordinates", "updateProfileUser", "updateGodfathers",
      "updateProfileAvailabilities",
      "makeAdminSucc", "revokeAdminSucc",
      "makeGodfatherSucc", "revokeGodfatherSucc",
      "addSubordinateSucc", "removeSubordinateSucc",
      "editUserSucc", "uploadCvSucc");
  }
  
  //ezek a felhasznalonak a keresztapjat allitjak be
  //nem pedig a keresztapa ala adnak egy kovetot
  addSubordinate(userId, subId){
    let resp={userId, subId};
    return dispatch=>{
      dispatch(resp);
      return axios.post(`/users/${subId}/add_godfather`, {
        godfather_id: userId
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.addSubordinateSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  removeSubordinate(userId, subId){
    return dispatch=>{
      let resp={userId, subId};
      dispatch(resp);
      return axios.post(`/users/${subId}/remove_godfather`,{}, {
        responseType: 'json'
      })
      .then(data=>{
        this.removeSubordinateSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }

  makeAdmin(userId){
    return dispatch=>{
      let resp={userId};
      dispatch(resp);
      return axios.get(`/users/${userId}/make_admin`, {
        responseType: 'json'
      })
      .then(data=>{
        this.makeAdminSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  revokeAdmin(userId){
    return dispatch=>{
      let resp={userId};
      dispatch(resp);
      return axios.get(`/users/${userId}/revoke_admin`, {
        responseType: 'json'
      })
      .then(data=>{
        this.revokeAdminSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  makeGodfather(userId){
    return dispatch=>{
      let resp={userId};
      dispatch(resp);
      return axios.get(`/users/${userId}/make_godfather`, {
        responseType: 'json'
      })
      .then(data=>{
        this.makeGodfatherSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  revokeGodfather(userId){
    return dispatch=>{
      let resp={userId};
      dispatch(resp);
      return axios.get(`/users/${userId}/revoke_godfather`, {
        responseType: 'json'
      })
      .then(data=>{
        this.revokeGodfatherSucc(_.extend({}, resp, {data: data.data}));
      })
      .catch(this.error);
    };
  }
  
  editUser(firstName, lastName, currentPassword, newPassword, newPasswordConfirmation, godfatherId, receiveEmail, freq, mailForExpiredAvailabilities, userId){
    return dispatch=>{
      let resp={firstName, lastName, currentPassword, newPassword, newPasswordConfirmation, userId};
      return axios.post(`/users/change`, {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
        last_name: lastName,
        first_name: firstName,
        godfather_id: godfatherId,
        freq,
        receive_email: receiveEmail,
        mail_for_expired_availabilities: mailForExpiredAvailabilities
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.editUserSucc(_.extend({}, resp, {data: data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  uploadCv(formData){
    return dispatch=>{
      return axios.post('/users/upload_cv', formData, {
        responseType: 'json'
      })
      .then(data=>{
        this.uploadCvSucc();
        return data;
      });
    };
  }
}

export default alt.createActions(UserActions);
