"use strict";

import React from 'react';

import competenceTypeActions from '../../actions/competence_type_actions';

export default React.createClass({
  render(){
    return <div onClick={this.onSelect}>{this.props.competence.title}</div>;
  },
  
  onSelect(){
    competenceTypeActions.selectCompetence(this.props.competence.id);
  }
});
