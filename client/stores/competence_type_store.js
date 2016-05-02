"use strict";

import alt from '../alt/alt';
import competenceTypeActions from '../actions/competence_type_actions';
import competenceTypeSource from '../sources/competence_type_source';

import _ from 'lodash';

class CompetenceTypeStore{
  constructor(){
    this.competenceTypes=[];
    this.bindActions(competenceTypeActions);
    this.bindListeners({
      reloadCompetenceTypes: [
        competenceTypeActions.CREATE_COMPETENCE_TYPE_SUCC,
        competenceTypeActions.CREATE_COMPETENCE_SUCC,
        competenceTypeActions.UPDATE_COMPETENCE_SUCC,
        competenceTypeActions.UPDATE_COMPETENCE_TYPE_SUCC,
        competenceTypeActions.DELETE_COMPETENCE_SUCC,
        competenceTypeActions.DELETE_COMPETENCE_TYPE_SUCC
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
  
  selectType(id){
    this.competenceTypes=this.competenceTypes.map(e=>{
      return _.assign(e, {selected: (e.id===id)});
    });
  }
  
  selectCompetence(id){
    this.competenceTypes.forEach(ct=>{
      ct.competences.forEach(c=>{
        c.selected=(c.id===id);
      });
    });
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceTypeStore, "competenceTypeStore");
