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
  }
};
