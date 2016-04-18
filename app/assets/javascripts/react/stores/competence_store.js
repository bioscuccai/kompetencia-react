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
    this.bindActions(competenceActions);
    this.bindListeners({
      reloadUserCompetences: [
        competenceActions.SET_LEVEL,
        competenceActions.SET_PENDING_LEVEL,
        competenceActions.REMOVE_ASSIGNED,
        competenceActions.REJECT_PENDING,
        competenceActions.ACCEPT_PENDING
      ]
    });
    this.registerAsync(competenceSource);
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
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceStore);
