"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class CompetenceActions{
  constructor(){
    this.generateActions("error", "updateAllCompetences", "updateCompetences", "updatePendingCompetences",
  
    "setLevelSucc", "setPendingLevelSucc", "acceptPendingSucc", "rejectPendingSucc", "removeAssignedSucc");
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
      })
      .catch(this.error);
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
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(CompetenceActions);
