'use strict';

import alt from '../alt/alt';
import reportActions from '../actions/report_actions';
import reportSource from '../sources/report_source';

class ReportStore{
  constructor(){
    this.reports=[];
    this.savedQueries=[];
    
    this.currentReport=null;
    this.results=[];
    
    this.bindActions(reportActions);
    this.registerAsync(reportSource);
    this.bindListeners({
      reloadReports: [
        reportActions.CREATE_REPORT_SUCC
      ],
      reloadSavedQueries: [
        reportActions.CREATE_SAVED_QUERY_SUCC
      ]
    });
  }
  
  reloadReports(){
    this.getInstance().fetchReports();
    return false;
  }
  
  reloadSavedQueries(){
    this.getInstance().fetchSavedQueries();
    return false;
  }
  
  updateReports(reports){
    this.reports=reports;
  }
  
  updateSavedQueries(savedQueries){
    this.savedQueries=savedQueries;
  }
  
  updateCurrentReport(currentReport){
    this.currentReport=currentReport;
  }
  
  updateResults(results){
    this.results=results;
  }
}

export default alt.createStore(ReportStore, 'reportStore');
