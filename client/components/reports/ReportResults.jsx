'use strict';

import React from 'react';

import ReportResult from './ReportResult.jsx';
import Loading from '../Loading.jsx';

import reportStore from '../../stores/report_store';

export default React.createClass({
  getInitialState(){
    return {
      currentReport: null,
      results: []
    };
  },
  
  componentDidMount(){
    reportStore.listen(this.handleReportStoreChange);
    this.fetch(this.props);
  },
  
  componentWillUnmount(){
    reportStore.unlisten(this.handleReportStoreChange);
  },
  
  componentWillReceiveProps(props){
    this.fetch(props);
  },
  
  fetch(props){
    reportStore.fetchReport(props.params.reportId);
    reportStore.fetchResults(props.params.reportId);
  },
  
  handleReportStoreChange(state){
    console.log(state);
    this.setState({
      currentReport: state.currentReport,
      results: state.results
    });
  },
  
  render(){
    if(!this.state.currentReport){
      return <Loading></Loading>;
    }
    return <div>
      <h1>Report eredmény</h1>
      <div className='clearfix'>
        <div className='float-left'>
          <h3>{this.state.currentReport.name}</h3>
        </div>
        <div className='float-right'>
          <a className='button' href={`/reports/${this.state.currentReport.id}/results.csv`}>
            <i className='icon ion-android-download'></i> CSV
          </a>
        </div>
      </div>
      {
        this.state.results.map((result, index) => {
          return <ReportResult
            key={`result-${index}`}
            result={result}></ReportResult>;
        })
      }
    </div>;
  }
});
