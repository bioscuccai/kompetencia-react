"use strict";

import alt from '../alt/alt';
import competenceActions from '../actions/competence_actions';
import competenceSource from '../sources/competence_source';

//nyersen tarolja a szerverrol kapott adatokat
//amit kell majd a komponens ami felhasznalja majd elore feldolgozza

class CompetenceStore{
  constructor(){
    this.allCompetences=[];
    this.pendingCompetences=[];
    this.competences=[];
    this.allSkills=[];
    this.bindActions(competenceActions);
    this.bindListeners({
      reloadUserCompetences: [
        competenceActions.SET_LEVEL_SUCC,
        competenceActions.SET_PENDING_LEVEL_SUCC,
        competenceActions.REMOVE_ASSIGNED_SUCC,
        competenceActions.REJECT_PENDING_SUCC,
        competenceActions.ACCEPT_PENDING_SUCC,
        competenceActions.MASS_ACCEPT_PENDING_SUCC
      ],
      reloadAllSkills: [
        competenceActions.ADD_SKILL_SUCC
      ]
    });
    this.registerAsync(competenceSource);
  }
  
  updateSkills(allSkills){
    console.log(allSkills);
    this.allSkills=allSkills;
  }
  
  updateAllCompetences(allCompetences){
    this.allCompetences=allCompetences;
  }
  
  updateCompetences(competences){
    this.competences=competences;
  }
  
  updatePendingCompetences(pendingCompetences){
    this.pendingCompetences=pendingCompetences;
  }
  
  reloadUserCompetences(userData){
    this.getInstance().fetchCompetences(userData.userId);
    this.getInstance().fetchPendingCompetences(userData.userId);
    return false;
  }
  
  reloadAllSkills(){
    this.getInstance().fetchAllSkills();
    return false;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceStore, "competenceStore");
