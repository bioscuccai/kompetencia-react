import alt from '../alt/alt';
import axios from 'axios';

class QueryActions{
  constructor(){
    this.generateActions("error", "updateResults");
  }
  
  setCompetenceLevel(id, level, state){
    return {
      id,
      level,
      state
    };
  }
}

export default alt.createActions(QueryActions);