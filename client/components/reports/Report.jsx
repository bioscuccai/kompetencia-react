'use strict';

import React from 'react';
import {NotificationManager} from 'react-notifications';

import SavedQuery from './SavedQuery.jsx';
import ReportButtons from './ReportButtons.jsx';

import reportActions from '../../actions/report_actions';

import {Link} from 'react-router';

export default React.createClass({
  render(){
    return <div className='row'>
      <div className='column column-80'>
        <h4>{this.props.report.name}&nbsp;
          <Link to={`/report_results/${this.props.report.id}`} className='button'>
            <i className='icon ion-arrow-right-b'></i>
            Végrehajtás
          </Link>
          
        </h4>
        <blockquote>
          {this.props.report.saved_queries.map(sq=>{
            return <SavedQuery
              key={`report-${this.props.report.id}-sq-${sq.id}`}
              savedQuery={sq}></SavedQuery>;
          })}
        </blockquote>
      </div>
      <div className='column column-20'>
        <div>
          <button onClick={this.onDelete}>
            <i className='icon ion-trash-a'></i>
          </button>
        </div>
        <div>
          <button onClick={this.props.onUpdate}>
            <i className='icon ion-compose'></i>
          </button>
        </div>
      </div>
    </div>;
  },
  
  onDelete(){
    reportActions.deleteReport(this.props.report.id)
    .then(data=>{
      NotificationManager.info("Report törölve");
      return data;
    });
  },
  
  onUpdate(){
    
  }
});
