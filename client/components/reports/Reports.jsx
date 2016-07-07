'use strict';

import React from 'react';

import Modal from 'react-modal';

import NewReport from './NewReport.jsx';
import Report from './Report.jsx';

import modalStyle from '../../styles/modal';

import alt from '../../alt/alt';
import reportActions from '../../actions/report_actions';
import reportStore from '../../stores/report_store';

export default React.createClass({
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  componentDidMount(){
    alt.recycle(reportStore);
    reportStore.listen(this.handleReportStoreChange);
    reportStore.fetchReports();
    reportStore.fetchSavedQueries();
  },
  
  componentWillUnmount(){
    reportStore.unlisten(this.handleReportStoreChange);
  },
  
  getInitialState(){
    return {
      savedQueries: [],
      reports: [],
      newModal: false
    };
  },
  
  onRequestCloseNew(){
    this.setState({newModal: false});
  },
  
  onNewReport(){
    this.setState({newModal: true});
  },
  
  handleReportStoreChange(state){
    console.log(state);
    this.setState({
      savedQueries: state.savedQueries,
      reports: state.reports
    });
  },
  
  render(){
    return <div>
      <h1>Reportok</h1>
      <button onClick={this.onNewReport}>
        <i className='icon ion-plus-round'></i>
        Új report
      </button>
      {this.state.reports.map(report=>{
        return <Report
            key={report.id}
            report={report}
          ></Report>;
      })}
      <Modal
        isOpen={this.state.newModal}
        onRequestClose={this.onRequestCloseNew}
        style={modalStyle}>
        <NewReport
          savedQueries={this.state.savedQueries}
          onClose={this.onRequestCloseNew}></NewReport>
      </Modal>
    </div>;
  }
});
