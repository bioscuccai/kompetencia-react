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
  
  updateTier(tierData){
    this.getInstance().fetchCompetenceTiers();
  }
  
  deleteTier(id){
    this.getInstance().fetchCompetenceTiers();
  }
  
  updateTierGroup(tierGroupData){
    this.getInstance().fetchCompetenceTiers();
  }
  
  deleteTierGroup(id){
    this.getInstance().fetchCompetenceTiers();
  }
  
  refresh(){
    this.getInstance().fetchCompetenceTiers();
  }
  
  error(err){
    console.log(err);
  }
}

window.competenceTierStore=alt.createStore(CompetenceTierStore);
