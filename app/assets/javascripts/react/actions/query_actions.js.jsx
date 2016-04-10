class QueryActions{
  setCompetenceLevel(id, level, state){
    return {
      id,
      level,
      state
    };
  }
  
  updateResults(results){
    return results;
  }
  
  error(err){
    return err;
  }
}

window.queryActions=alt.createActions(QueryActions);