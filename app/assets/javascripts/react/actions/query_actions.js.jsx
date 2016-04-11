import alt from '../alt/alt.js.jsx';
import axios from 'axios';

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

export default alt.createActions(QueryActions);