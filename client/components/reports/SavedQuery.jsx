'use strict';

import React from 'react';
import CompetenceBreadcrumb from '../user/CompetenceBreadcrumb.jsx';
import reportActions from '../../actions/report_actions';
import SavedQueryButtons from './SavedQueryButtons.jsx';

import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    let strictIcon;
    if(this.props.savedQuery.match_all){
      strictIcon=<div>
        <i className='icon ion-alert-circled' title=''></i> Összes kompetencia jelenléte stimmeljen
      </div>;
    }
    let pendingIcon;
    if(this.props.savedQuery.show_pending){
      pendingIcon=<div>
        <i className='icon ion-ios-timer-outline'></i> Megerösítetlen kompetenciák
      </div>;
    }
    
    return <div className='saved-query'>
      <Link to={`/query/${this.compileQueryString()}`}>
        <h4>{this.props.savedQuery.name}</h4>
      </Link>
      {strictIcon}
      {pendingIcon}
      {this.props.savedQuery.competences.map(competence=>{
        return <CompetenceBreadcrumb
          key={`sq-${this.props.savedQuery.id}-comp-${competence.id}`}
          competence={competence}
          ></CompetenceBreadcrumb>;
      })}
    </div>;
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
      ma: this.props.savedQuery.match_all,
      sp: this.props.savedQuery.show_pending
    });
  }
});
