'use strict';

import React from 'react';
import CompetenceBreadcrumb from '../user/CompetenceBreadcrumb.jsx';

export default React.createClass({
  render(){
    let strictIcon;
    if(this.props.savedQuery.matchAll){
      strictIcon=<i className='icon ion-alert-circled' title=''></i>;
    }
    return <div className='saved-query'>
      <div className='row'>
        <div className='column column-80'>
          <h4>{this.props.savedQuery.name} {strictIcon}</h4>
          {this.props.savedQuery.competences.map(competence=>{
            return <CompetenceBreadcrumb
              key={`sq-${this.props.savedQuery.id}-comp-${competence.id}`}
              competence={competence}
              ></CompetenceBreadcrumb>;
          })}
        </div>
        <div className='column column-20'>
          <button>
            <i className='icon ion-search'></i>
          </button>
        </div>
      </div>
      
    </div>;
  }
});
