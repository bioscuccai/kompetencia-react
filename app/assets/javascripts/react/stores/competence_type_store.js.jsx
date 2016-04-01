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

window.competenceTypeStore=alt.createStore(CompetenceTypeStore);
