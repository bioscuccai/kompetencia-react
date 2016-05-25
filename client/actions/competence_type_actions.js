"use strict";

import alt from '../alt/alt';
import axios from 'axios';
import _ from 'lodash';

class CompetenceTypeActions{
  constructor(){
    this.generateActions("error", "updateCompetenceTypes", "selectType", "selectCompetence",
  
    "createCompetenceTypeSucc", "updateCompetenceTypeSucc", "deleteCompetenceTypeSucc",
    "createCompetenceSucc", "updateCompetenceSucc", "deleteCompetenceSucc");
  }
  
  createCompetenceType(title, competenceTierGroupId, priority=0, showTitle=true){
    return dispatch=>{
      let resp={title, competenceTierGroupId};
      dispatch(resp);
      return axios.post('/competence_types.json', {
        competence_type: {
          title,
          competence_tier_group_id: competenceTierGroupId,
          priority,
          show_title: showTitle
        }
      }).then(data=>{
        this.createCompetenceTypeSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  createCompetence(title, competenceTypeId){
    return dispatch=>{
      let resp={title, competenceTypeId};
      dispatch(resp);
      return axios.post('/competences.json', {
        competence: {
          title,
          competence_type_id: competenceTypeId
        }
      })
      .then(data=>{
        this.createCompetenceSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updateCompetence(id, title){
    return dispatch=>{
      let resp={id, title};
      dispatch(resp);
      return axios.put(`/competences/${id}.json`, {
        competence: {
          title
        }
      })
      .then(data=>{
        this.updateCompetenceSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updateCompetenceType(id, title, competenceTierGroupId, priority=0, showTitle=true){
    return dispatch=>{
      let resp={id, title};
      dispatch(resp);
      return axios.put(`/competence_types/${id}.json`, {
        competence_type: {
          title,
          competence_tier_group_id: competenceTierGroupId,
          priority,
          show_title: showTitle
        }
      })
      .then(data=>{
        this.updateCompetenceTypeSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  deleteCompetenceType(id){
    return dispatch=>{
      let resp={id};
      dispatch(resp);
      return axios.delete(`/competence_types/${id}.json`)
      .then(data=>{
        this.deleteCompetenceTypeSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  deleteCompetence(id){
    return dispatch=>{
      let resp={id};
      dispatch(resp);
      return axios.delete(`/competences/${id}.json`)
      .then(data=>{
        this.deleteCompetenceSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
}

export default alt.createActions(CompetenceTypeActions);
