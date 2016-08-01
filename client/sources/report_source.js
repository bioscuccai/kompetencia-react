import axios from 'axios';
import reportActions from '../actions/report_actions';

export default {
  fetchReports: {
    remote(state){
      return new Promise((resolve, reject) => {
        axios.get('/reports.json', {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: reportActions.updateReports,
    error: reportActions.error
  },
  
  fetchSavedQueries: {
    remote(state){
      return new Promise((resolve, reject) => {
        axios.get('/saved_queries.json', {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: reportActions.updateSavedQueries,
    error: reportActions.error
  },
  
  fetchReport: {
    remote(state, id){
      return new Promise((resolve, reject) => {
        axios.get(`/reports/${id}.json`, {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: reportActions.updateCurrentReport,
    error: reportActions.error
  },
  
  fetchResults: {
    remote(state, id){
      return new Promise((resolve, reject) => {
        axios.get(`/reports/${id}/results.json`, {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: reportActions.updateResults,
    error: reportActions.error
  },
  
  fetchMatrix: {
    remote(state, id){
      return new Promise((resolve, reject) => {
        axios.get(`/reports/${id}/matrix.json`, {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: reportActions.updateMatrix,
    error: reportActions.error
  }
};
