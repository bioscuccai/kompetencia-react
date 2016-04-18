"use strict";

import alt from '../alt/alt';
import competenceTierActions from '../actions/competence_tier_actions';
import competenceTierSource from '../sources/competence_tier_source';
import _ from 'lodash';

class CompetenceTierStore{
  constructor(){
    this.competenceTierGroups=[];
    this.bindActions(competenceTierActions);
    this.bindListeners({
      reloadCompetenceTiers: [
        competenceTierActions.CREATE_COMPETENCE_TIER,
        competenceTierActions.CREATE_COMPETENCE_TIER_GROUP,
        competenceTierActions.UPDATE_TIER,
        competenceTierActions.DELETE_TIER,
        competenceTierActions.UPDATE_TIER_GROUP,
        competenceTierActions.DELETE_TIER_GROUP
      ]
    });
    this.registerAsync(competenceTierSource);
  }
  
  updateCompetenceTierGroups(competenceTierGroups){
    this.competenceTierGroups=competenceTierGroups;
  }
  
  selectTier(id){
    this.competenceTierGroups.forEach(ctg=>{
      ctg.tiers=ctg.tiers.map(tier=>{
        return (tier.id===id) ? _.assign({}, tier, {selected: true}) : _.assign({}, tier, {selected: false});
      });
    });
  }
  
  selectTierGroup(id){
    this.competenceTierGroups.forEach(ctg=>{
      ctg.selected=(ctg.id===id);
    });
  }

  reloadCompetenceTiers(){
    this.getInstance().fetchCompetenceTiers();
    return false;
  }
  
  error(err){
    console.log(err);
  }
}

export default alt.createStore(CompetenceTierStore);
