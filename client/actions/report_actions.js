'use strict';

import alt from '../alt/alt';
import _ from 'lodash';
import axios from 'axios';

class ReportActions{
  constructor(){
    this.generateActions("updateReports", "updateCurrentReport", "updateResults", "updateSavedQueries", "error",
    "updateReportSucc",
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
  
  createReport(name, savedQueryIds){
    return dispatch=>{
      let resp={name, savedQueryIds};
      dispatch(resp);
      return axios.post('/reports.json', {
        report: {
          name: name,
          saved_query_ids: savedQueryIds
        }
      }, {responseType: 'json'})
      .then(data=>{
        this.createReportSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updateReport(id, name, savedQueryIds){
    return dispatch=>{
      let resp={id, name, savedQueryIds};
      dispatch(resp);
      return axios.put(`/reports/${id}`,{
        report: {
          name,
          saved_query_ids: savedQueryIds
        }
      })
      .then(data=>{
        this.updateReportSucc(_.extend({}, resp, {data: data.data}));
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
