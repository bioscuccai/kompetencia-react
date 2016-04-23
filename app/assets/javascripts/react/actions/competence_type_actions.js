"use strict";

import alt from '../alt/alt';
import axios from 'axios';

class CompetenceTypeActions{
  constructor(){
    this.generateActions("error", "updateCompetenceTypes", "selectType", "selectCompetence");
  }
  
  createCompetenceType(title, competenceTierGroupId){
    return dispatch=>{
      axios.post('/competence_types.json', {
        competence_type: {
          title,
          competence_tier_group_id: competenceTierGroupId
        }
      }).then(data=>{
        return dispatch({
          title,
          competenceTierGroupId
        });
      });
    };
  }
  
  createCompetence(title, competenceTypeId){
    return dispatch=>{
      axios.post('/competences.json', {
        competence: {
          title,
          competence_type_id: competenceTypeId
        }
      })
      .then(data=>{
        return dispatch({
          title,
          competenceTypeId
        });
      });
    };
  }
  
  updateCompetence(id, title){
    return dispatch=>{
      axios.put(`/competences/${id}.json`, {
        competence: {
          title
        }
      })
      .then(data=>{
        return dispatch({
          id,
          title
        });
      });
    };
  }
  
  updateCompetenceType(id, title){
    return dispatch=>{
      axios.put(`/competence_types/${id}.json`, {
        competence_type: {
          title
        }
      })
      .then(data=>{
        return dispatch({
          id,
          title
        });
      });
    };
  }
  
  deleteCompetenceType(id){
    return dispatch=>{
      axios.delete(`/competence_types/${id}.json`)
      .then(data=>{
        return dispatch(id);
      });
    };
  }
  
  deleteCompetence(id){
    return dispatch=>{
      axios.delete(`/competences/${id}.json`)
      .then(data=>{
        return dispatch(id);
      });
    };
  }
}

export default alt.createActions(CompetenceTypeActions);
