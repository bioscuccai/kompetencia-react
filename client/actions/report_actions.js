'use strict';

import alt from '../alt/alt';
import _ from 'lodash';
import axios from 'axios';

class ReportActions{
  constructor(){
    this.generateActions("updateReports", "updateCurrentReport", "updateResults", "updateSavedQueries", "error",
    "updateReportSucc", "updateSavedQuerySucc",
    "deleteReportSucc", "deleteSavedQuerySucc",
    "createSavedQuerySucc", "createReportSucc");
  }
  
  createSavedQuery(name='', matchAll=false, showPending=false, competences=[]){
    return dispatch=>{
      let resp={name, matchAll, competences};
      dispatch(resp);
      return axios.post('/saved_queries.json', {
        saved_query: {
          name,
          match_all: matchAll,
          show_pending: showPending,
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
      return axios.put(`/reports/${id}.json`,{
        report: {
          name,
          saved_query_ids: savedQueryIds
        }
      }, {responseType: 'json'})
      .then(data=>{
        this.updateReportSucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  updateSavedQuery(id, name, matchAll=false, showPending=false){
    return dispatch=>{
      let resp={id, name, matchAll, showPending};
      dispatch(resp);
      return axios.put(`/saved_queries/${id}.json`, {
        saved_query: {
          name,
          match_all: matchAll,
          show_pending: showPending
        },
      }, {responseType: 'json'})
      .then(data=>{
        this.updateSavedQuerySucc(_.extend({}, resp, {data: data.data}));
        return data;
      })
      .catch(this.error);
    };
  }
  
  deleteSavedQuery(id){
    return dispatch=>{
      let resp={id};
      dispatch(resp);
      return axios.delete(`/saved_queries/${id}.json`, {responseType: 'json'})
      .then(data=>{
        this.deleteSavedQuerySucc(_.extend({}, resp, {data: data.data}));
        return data;
      });
    };
  }
  
  deleteReport(id){
    return dispatch=>{
      let resp={id};
      dispatch(resp);
      return axios.delete(`/reports/${id}.json`, {responseType: 'json'})
      .then(data=>{
        this.deleteReportSucc(_.extend({}, _, {data: data.data}));
        return data;
      });
    };
  }
  
  error(e){
    console.log(e);
  }
}

export default alt.createActions(ReportActions);
