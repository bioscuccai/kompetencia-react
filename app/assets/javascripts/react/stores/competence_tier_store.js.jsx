class CompetenceTierStore{
  constructor(){
    this.competenceTierGroups=[];
    this.bindActions(competenceTierActions);
    this.registerAsync(competenceTierSource);
  }
  
  updateCompetenceTierGroups(competenceTierGroups){
    this.competenceTierGroups=competenceTierGroups;
  }
  
  error(err){
    console.log(err);
  }
}

window.competenceTierStore=alt.createStore(CompetenceTierStore);
