'use strict';

import React from 'react';
import CompetenceBreadcrumb from '../user/CompetenceBreadcrumb.jsx';

export default React.createClass({
  render(){
    return <div className='saved-query'>
      <h4>{this.props.savedQuery.name}</h4>
      {this.props.savedQuery.competences.map(competence=>{
        return <CompetenceBreadcrumb competence={competence}></CompetenceBreadcrumb>;
      })}
    </div>;
  }
});
