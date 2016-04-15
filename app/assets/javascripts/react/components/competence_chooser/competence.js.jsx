"use strict";

import React from 'react';
import CompetenceAdministrationButtons from './competence_administration_buttons.js.jsx';
import CompetenceTierButton from './competence_tier_button.js.jsx';

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
    
    return <div className='container'>
      <div className={`row ${highlighClass}`}>
        <div className="column column-40">
          {this.props.competence.title} {this.props.competence.id} {this.props.competence.isAssigned} {this.props.isPending}
        </div>
        <div className="column column-50">
          {this.props.competence.tiers.map(tier=>{
            return <CompetenceTierButton key={`${this.props.competence.id}-${tier.level}`}
              directlyEdit={this.props.directlyEdit}
              competence={this.props.competence} tier={tier} user={this.props.user}></CompetenceTierButton>;
          })}
        </div>
        <div className="column column-10">
          <CompetenceAdministrationButtons
            directlyEdit={this.props.directlyEdit}
            competence={this.props.competence}
            user={this.props.user}></CompetenceAdministrationButtons>
        </div>
      </div>
    </div>;
  }
});
