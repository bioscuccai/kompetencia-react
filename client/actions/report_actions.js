'use strict';

import alt from '../alt/alt';
import _ from 'lodash';
import axios from 'axios';

class ReportActions{
  constructor(){
    this.generateActions("updateReports", "updateSavedQueries", "error",
    "createSavedQuerySucc", "createReportSucc");
  }
  
  createSavedQuery(name='', matchAll=false, competences=[]){
    return dispatch=>{
      let resp={name, matchAll, competences};
      dispatch(resp);
      return axios.post('/saved_queries.json', {
        saved_query: {
          name,
          match_all: matchAll,
          competences
        }
      }, {responseType: 'json'})
      .then(data=>{
        this.createSavedQuerySucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  error(e){
    console.log(e);
  }
}

export default alt.createActions(ReportActions);
