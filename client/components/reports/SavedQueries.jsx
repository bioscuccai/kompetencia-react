'use strict';

import React from 'react';

import reportActions from '../../actions/report_actions';
import reportStore from '../../stores/report_store';
import alt from '../../alt/alt';

import SavedQuery from './SavedQuery.jsx';
import SavedQueryButtons from './SavedQueryButtons.jsx';

export default React.createClass({
  componentDidMount(){
    alt.recycle(reportStore);
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
        return <div className='row' key={`sq-${sq.id}`}>
          <div className='column column-80'>
            <SavedQuery savedQuery={sq}></SavedQuery>
          </div>
          <div className='column column-20'>
            <SavedQueryButtons savedQuery={sq}></SavedQueryButtons>
          </div>
        </div>;
      })}
    </div>;
  }
});
