"use strict";

import React from 'react';
import competenceActions from '../../actions/competence_actions';

import classnames from 'classnames';

export default React.createClass({
  render(){
    let buttonClass=classnames({
      'selected-tier': (this.props.competence.level==this.props.tier.level),
      'pending-tier': (this.props.competence.pendingLevel==this.props.tier.level)
    });
    
    return <a href='#' className={`button ${buttonClass} button-competence-selector`}
      onClick={this.setLevel}>
      {this.props.tier.title}
    </a>;
  },
  
  setLevel(e){
    e.preventDefault();
    if(this.props.directlyEdit){
      competenceActions.setLevel(this.props.competence.id, this.props.user.id, this.props.tier.level);
    } else {
      competenceActions.setPendingLevel(this.props.competence.id, this.props.user.id, this.props.tier.level);
    }
  }
});
