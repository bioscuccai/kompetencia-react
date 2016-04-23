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
        competenceTypeActions.CREATE_COMPETENCE_TYPE,
        competenceTypeActions.CREATE_COMPETENCE,
        competenceTypeActions.UPDATE_COMPETENCE,
        competenceTypeActions.UPDATE_COMPETENCE_TYPE,
        competenceTypeActions.DELETE_COMPETENCE,
        competenceTypeActions.DELETE_COMPETENCE_TYPE
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

export default alt.createStore(CompetenceTypeStore);
