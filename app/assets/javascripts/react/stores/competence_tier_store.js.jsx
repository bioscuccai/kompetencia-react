class CompetenceTierStore{
  constructor(){
    this.competenceTierGroups=[];
    this.bindActions(competenceTierActions);
    this.registerAsync(competenceTierSource);
  }
  
  updateCompetenceTierGroups(competenceTierGroups){
    this.competenceTierGroups=competenceTierGroups;
  }
  
  createCompetenceTier(){
    this.getInstance().fetchCompetenceTiers();
  }
  
  createCompetenceTierGroup(){
    this.getInstance().fetchCompetenceTiers();
  }
  
  error(err){
    console.log(err);
  }
}

window.competenceTierStore=alt.createStore(CompetenceTierStore);
