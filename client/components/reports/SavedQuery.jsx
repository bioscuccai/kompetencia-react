'use strict';

import React from 'react';
import CompetenceBreadcrumb from '../user/CompetenceBreadcrumb.jsx';
import reportActions from '../../actions/report_actions';

import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    let strictIcon;
    if(this.props.savedQuery.match_all){
      strictIcon=<div>
        <i className='icon ion-alert-circled' title=''></i> Összes kompetencia jelenléte stimmeljen (szint nem feltételen)
      </div>;
    }
    let pendingIcon;
    if(this.props.savedQuery.show_pending){
      pendingIcon=<div>
        <i className='icon ion-ios-timer-outline'></i> Megerösítetlen kompetenciák
      </div>;
    }
    
    return <div className='saved-query'>
      <div className='row'>
        <div className='column column-80'>
          <h4>{this.props.savedQuery.name}</h4>
          {strictIcon}
          {pendingIcon}
          {this.props.savedQuery.competences.map(competence=>{
            return <CompetenceBreadcrumb
              key={`sq-${this.props.savedQuery.id}-comp-${competence.id}`}
              competence={competence}
              ></CompetenceBreadcrumb>;
          })}
        </div>
        <div className='column column-20'>
          <Link to={`/query/${this.compileQueryString()}`} className='button'>
            <i className='icon ion-search'></i>
          </Link>
          <a onClick={this.onDelete} className='button'>
            <i className='icon ion-trash-a'></i>
          </a>
        </div>
      </div>
      
    </div>;
  },
  
  onDelete(e){
    e.preventDefault();
    reportActions.deleteSavedQuery(this.props.savedQuery.id)
    .then(data=>{
      NotificationManager.info("Törölve");
    });
  },
  
  compileQueryString(){
    
    let comps=this.props.savedQuery.competences.map(competence=>{
      return {
        c: competence.id,
        l: competence.level
      };
    });
    return JSON.stringify({
      cl: comps,
      ma: this.props.savedQuery.matchAll,
      sp: this.props.savedQuery.showPending
    });
  }
});
