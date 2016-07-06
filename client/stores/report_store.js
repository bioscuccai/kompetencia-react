import alt from '../alt/alt';
import reportActions from '../actions/report_actions';
import reportSource from '../sources/report_source';

class ReportStore{
  constructor(){
    this.reports=[];
    this.savedQueries=[];
    this.bindActions(reportActions);
    this.registerAsync(reportSource);
  }
  
  updateReports(report){
    this.reports=reports;
  }
  
  updateSavedQueries(savedQueries){
    this.savedQueries=savedQueries;
  }
}

export default alt.createStore(ReportStore, 'reportStore');
