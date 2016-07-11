'use strict';

import React from 'react';
import {NotificationManager} from 'react-notifications';
import Modal from 'react-modal';

import modalStyle from '../../styles/modal';

import SavedQuery from './SavedQuery.jsx';
import ReportButtons from './ReportButtons.jsx';
import UpdateReport from './UpdateReport.jsx';

import reportActions from '../../actions/report_actions';

import {Link} from 'react-router';

export default React.createClass({
  getInitialState(){
    return {
      updateModal: false
    };
  },
  
  render(){
    return <div>
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
    this.setState({updateModal: true});
  },
  
  onRequestCloseUpdate(){
    this.setState({updateModal: false});
  }
});
