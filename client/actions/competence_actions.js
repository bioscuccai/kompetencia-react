"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class CompetenceActions{
  constructor(){
    this.generateActions("error", "updateAllCompetences", "updateCompetences", "updatePendingCompetences", "updateSkills",
  
    "setLevelSucc", "setPendingLevelSucc", "acceptPendingSucc", "rejectPendingSucc", "removeAssignedSucc",
    "addSkillSucc", "removeSkillSucc", "confirmSkillSucc", "massAcceptPendingSucc", "massSkillSucc");
  }
  
  //ezen keresztul szol a store-nak, hogy frissitse az user kompetenciait miutan visszajelzett a szero
  setLevel(competenceId, userId, level){
    return dispatch=>{
      let resp={ competenceId, userId, level };
      dispatch(resp);
      return axios.post(`/users/${userId}/add_competence`,{
        competence_id: competenceId,
        level
      })
      .then(data=>{
        this.setLevelSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }

  setPendingLevel(competenceId, userId, level){
    return dispatch=>{
      let resp={ competenceId, userId, level };
      dispatch(resp);
      return axios.post(`/users/${userId}/add_pending_competence`, {
        competence_id: competenceId,
        user_id: userId,
        level
      })
      .then(data=>{
        this.setPendingLevelSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  acceptPending(competenceId, userId){
    return dispatch=>{
      let resp={ competenceId, userId };
      dispatch(resp);
      return axios.post(`/users/${userId}/accept_pending_competence`, {
        user_id: userId,
        competence_id: competenceId
      })
      .then(data=>{
        this.acceptPendingSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  massAcceptPending(userId, competenceIds){
    return dispatch=>{
      let resp={userId, competenceIds};
      dispatch(resp);
      return axios.post(`/users/${userId}/mass_accept_pending`, {
        competence_ids: competenceIds
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.massAcceptPendingSucc(_.extend({}, resp, {data: data.data}));
        return data;
      });
    };
  }
  
  massAcceptSkill(userId, skillIds){
    return dispatch=>{
      let resp={userId, skillIds};
      dispatch(resp);
      return axios.post(`/users/${userId}/mass_accept_skill`, {
        skill_ids: skillIds
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.massAcceptSkillSucc(_.extend({}, resp, {data: data.data}));
        return data;
      });
    };
  }
  
  rejectPending(competenceId, userId){
    return dispatch=>{
      let resp={ competenceId, userId };
      dispatch(resp);
      return axios.post(`/users/${userId}/reject_pending_competence`, {
        user_id: userId,
        competence_id: competenceId
      })
      .then(data=>{
        this.rejectPendingSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  removeAssigned(competenceId, userId){
    return dispatch=>{
      let resp={ competenceId, userId };
      dispatch(resp);
      return axios.post(`/users/${userId}/remove_competence`, {
          competence_id: competenceId
      },{
        responseType: 'json'
      })
      .then(data=>{
        this.removeAssignedSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  addSkill(userId, name){
    return dispatch=>{
      let resp={userId, name};
      dispatch(resp);
      return axios.post(`/users/${userId}/skills.json`, {
        name
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.addSkillSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  removeSkill(userId, skillId){
    return dispatch=>{
      let resp={userId, skillId};
      dispatch(resp);
      return axios.delete(`/users/${userId}/skills/${skillId}.json`, {
        responseType: 'json'
      })
      .then(data=>{
        this.removeSkillSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  confirmSkill(userId, skillId){
    return dispatch=>{
      let resp={userId, skillId};
      dispatch(resp);
      return axios.get(`/users/${userId}/skills/${skillId}/confirm`)
      .then(data=>{
        this.confirmSkillSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(CompetenceActions);
