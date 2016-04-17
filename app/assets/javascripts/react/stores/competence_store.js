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
  
  //csak annyit tud h szint valtozas tortent, ezert lekeri a szerverrol az uj allapotot
  setLevel(levelData){
    this.getInstance().fetchCompetences(levelData.userId);
    this.getInstance().fetchPendingCompetences(levelData.userId);
  }
  
  setPendingLevel(levelData){
    this.getInstance().fetchCompetences(levelData.userId);
    this.getInstance().fetchPendingCompetences(levelData.userId);
  }
  
  removeAssigned(removalData){
    this.getInstance().fetchCompetences(removalData.userId);
    this.getInstance().fetchPendingCompetences(removalData.userId);
  }
  
  rejectPending(removalData){
    this.getInstance().fetchCompetences(removalData.userId);
    this.getInstance().fetchPendingCompetences(removalData.userId);
  }
  
  acceptPending(acceptanceData){
    this.getInstance().fetchCompetences(acceptanceData.userId);
    this.getInstance().fetchPendingCompetences(acceptanceData.userId);
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceStore);
