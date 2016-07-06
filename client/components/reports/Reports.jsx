'use strict';

import React from 'react';

import reportActions from '../../actions/report_actions';
import reportStore from '../../stores/report_store';

export default React.createClass({
  componentDidMount(){
    reportStore.listen(this.handleReportStoreChange);
  },
  
  componentWillUnmount(){
    reportStore.unlisten(this.handleReportStoreChange);
  },
  
  getInitialState(){
    return {
      savedQueries: [],
      reports: []
    };
  },
  
  handleReportStoreChange(state){
    this.setState({
      savedQueries: state.savedQueries,
      reports: state.reports
    });
  },
  
  render(){
    return <div>
      <h1>Reportok</h1>
    </div>;
  }
});
