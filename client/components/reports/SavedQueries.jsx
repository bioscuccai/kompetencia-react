'use strict';

import React from 'react';

import reportActions from '../../actions/report_actions';
import reportStore from '../../stores/report_store';

import SavedQuery from './SavedQuery.jsx';

export default React.createClass({
  componentDidMount(){
    reportStore.listen(this.handleReportStoreChange);
    reportStore.fetchSavedQueries();
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
    console.log(state);
    this.setState({
      savedQueries: state.savedQueries,
      reports: state.reports
    });
  },
  
  render(){
    return <div>
      <h1>Mentett keresések</h1>
      {this.state.savedQueries.map(sq=>{
        return <SavedQuery
          savedQuery={sq}
          key={sq.id}
          ></SavedQuery>;
      })}
    </div>;
  }
});
