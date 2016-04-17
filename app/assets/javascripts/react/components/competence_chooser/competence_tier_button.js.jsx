"use strict";

import React from 'react';
import competenceActions from '../../actions/competence_actions';

export default React.createClass({
  render(){
    let buttonClass='';
    if(this.props.competence.level==this.props.tier.level){
      buttonClass='selected-tier';
    }
    if(this.props.competence.pendingLevel==this.props.tier.level){
      buttonClass='pending-tier';
    }
    
    return <a href='#' className={`button ${buttonClass}`}
      onClick={this.setLevel}>
      {this.props.tier.title}
    </a>;
  },
  
  setLevel(e){
    console.log("args");
    console.log(arguments);
    e.preventDefault();
    if(this.props.directlyEdit){
      competenceActions.setLevel(this.props.competence.id, this.props.user.id, this.props.tier.level);
    } else {
      competenceActions.setPendingLevel(this.props.competence.id, this.props.user.id, this.props.tier.level);
    }
  }
});
