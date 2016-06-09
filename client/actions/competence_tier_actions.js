"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class CompetenceTierActions{
  constructor(){
    this.generateActions("error", "selectTier", "selectTierGroup", "updateCompetenceTierGroups",
  
    "createCompetenceTierSucc", "updateTierSucc", "deleteTierSucc",
    "createCompetenceTierGroupSucc", "updateTierGroupSucc", "deleteTierGroupSucc");
  }
  
  createCompetenceTierGroup(title, description){
    return dispatch=>{
      let resp={title, description};
      dispatch(resp);
      return axios.post('/competence_tier_groups.json', {
        competence_tier_group: {
          title,
          description
        }
      }, {
          responseType: 'json'
      })
      .then(data=>{
        this.createCompetenceTierGroupSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  createCompetenceTier(title, description, competenceTierGroupId){
    return dispatch=>{
      let resp={title, description, competenceTierGroupId};
      dispatch(resp);
      return axios.post('/competence_tiers.json', {
        competence_tier: {
          title,
          description,
          competence_tier_group_id: competenceTierGroupId
        }
      }, {
          responseType: 'json'
      })
      .then(data=>{
        this.createCompetenceTierSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updateTier(id, title, level, description){
    return dispatch=>{
      let resp={id, title, level, description};
      dispatch(resp);
      return axios.put(`/competence_tiers/${id}.json`, {
        competence_tier: {
          title,
          description
        }
      }, {
        responseType: 'json'
      }).then(data=>{
        this.updateTierSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  deleteTier(id){
    console.log("delete") ;
    return dispatch=>{
      let resp={id};
      dispatch(resp);
      return axios.delete(`/competence_tiers/${id}.json`)
      .then(data=>{
        this.deleteTierSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updateTierGroup(id, title){
    return dispatch=>{
      let resp={id, title};
      dispatch(resp);
      return axios.put(`/competence_tier_groups/${id}.json`, {
        competence_tier_group: {
          title
        }
      }, {
        responseType: 'json'
      })
      .then(data=>{
        this.updateTierGroupSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  deleteTierGroup(id){
    return dispatch=>{
      let resp={id};
      dispatch(resp);
      return axios.delete(`/competence_tier_groups/${id}.json`)
      .then(data=>{
        this.deleteTierGroupSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(CompetenceTierActions);
