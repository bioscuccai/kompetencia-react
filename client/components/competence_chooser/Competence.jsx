"use strict";

import React from 'react';
import CompetenceAdministrationButtons from './CompetenceAdministrationButtons.jsx';
import CompetenceTierButton from './CompetenceTierButton.jsx';
import classnames from 'classnames';

export default React.createClass({
  render(){
    let highlighClass="";
    //kiemeles
    if(this.props.competence.isAssigned){
      highlighClass='assigned-competence';
    }
    if(this.props.competence.isPending){
      highlighClass='pending-competence';
    }
    
    return <tr className={`${highlighClass}`}>
        <td>
          {this.props.competence.title}
        </td>
        <td>
          {this.props.competence.tiers.map(tier=>{
            return <CompetenceTierButton key={`${this.props.competence.id}-${tier.level}`}
              currentUser={this.props.currentUser}
              competence={this.props.competence} tier={tier} user={this.props.user}></CompetenceTierButton>;
          })}
        </td>
        <td>
          <CompetenceAdministrationButtons
            currentUser={this.props.currentUser}
            competence={this.props.competence}
            user={this.props.user}></CompetenceAdministrationButtons>
        </td>
      </tr>;
  }
});
