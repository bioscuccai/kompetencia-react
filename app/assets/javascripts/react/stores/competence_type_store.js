"use strict";

import alt from '../alt/alt';
import competenceTypeActions from '../actions/competence_type_actions';
import competenceTypeSource from '../sources/competence_type_source';


class CompetenceTypeStore{
  constructor(){
    this.competenceTypes=[];
    this.bindActions(competenceTypeActions);
    this.registerAsync(competenceTypeSource);
  }
  
  updateCompetenceTypes(competenceTypes){
    this.competenceTypes=competenceTypes;
  }
  
  createCompetenceType(competenceTypeData){
    this.getInstance().fetchCompetenceTypes();
  }
  
  createCompetence(competenceData){
    this.getInstance().fetchCompetenceTypes();
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceTypeStore);
