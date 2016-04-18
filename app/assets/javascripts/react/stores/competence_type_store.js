"use strict";

import alt from '../alt/alt';
import competenceTypeActions from '../actions/competence_type_actions';
import competenceTypeSource from '../sources/competence_type_source';


class CompetenceTypeStore{
  constructor(){
    this.competenceTypes=[];
    this.bindActions(competenceTypeActions);
    this.bindListeners({
      reloadCompetenceTypes: [
        competenceTypeActions.CREATE_COMPETENCE_TYPE,
        competenceTypeActions.CREATE_COMPETENCE
      ]
    });
    this.registerAsync(competenceTypeSource);
  }
  
  updateCompetenceTypes(competenceTypes){
    this.competenceTypes=competenceTypes;
  }
  
  reloadCompetenceTypes(){
    this.getInstance().fetchCompetenceTypes();
    return false;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceTypeStore);
