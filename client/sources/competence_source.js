"use strict";

import axios from 'axios';

import competenceActions from '../actions/competence_actions';

export default {
  fetchAllCompetences: {
    remote(state){
      return new Promise((resolve, reject)=>{
        axios.get("/competences", {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updateAllCompetences,
    error: competenceActions.error
  },
  
  fetchCompetences: {
    remote(state, userId){
      return new Promise((resolve, reject)=>{
        axios.get(`/users/${userId}/assigned_competences`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updateCompetences,
    error: competenceActions.error
  },
  
  fetchPendingCompetences: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}/pending_competences`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updatePendingCompetences,
    error: competenceActions.error
  },
  
  fetchAllSkills: {
    remote(state){
      return new Promise((resolve, reject)=>{
        axios.get('/skills.json', {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updateSkills,
    error: competenceActions.error
  }
};
