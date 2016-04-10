class QueryStore{
  constructor(){
    this.results=[];
    this.competenceQuery=[];
    this.bindActions(queryActions);
    this.registerAsync(querySource);
    //az eredeti competence source alapjan keri le az osszes kompetenciat(nev, tipus, szintnevek)
    //amire epitve eltarolja, hogy milyen kompetencia milyen szintjet keressuk
    this.registerAsync(competenceSource);
    this.bindAction(competenceActions.updateAllCompetences, this.updateCompetenceQuery);
  }
  
  updateCompetenceQuery(competenceQuery){
    this.competenceQuery=competenceQuery;
  }
  
  setCompetenceLevel(levelData){
    _.find(this.competenceQuery, ['id', levelData.id]).selectedLevel=levelData.state ? levelData.level : null;
  }
  
  updateResults(results){
    this.results=results;
  }
  
  error(err){
    console.log(err);
  }
}

window.queryStore=alt.createStore(QueryStore);
