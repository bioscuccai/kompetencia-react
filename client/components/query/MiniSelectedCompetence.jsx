"use strict";

import React from 'react';
import queryActions from '../../actions/query_actions';
import _ from 'lodash';

export default React.createClass({
  italicStyle: {
    fontStyle: 'italic'
  },
  render() {
    return <small className='mini-competence'>
      {this.props.competence.title}
      (
      <span style={this.italicStyle}>
        {_.find(this.props.competence.tiers, ['level', this.props.competence.selectedLevel]).title}
      </span>
      )
      <a href='#' onClick={this.onDeleteCompetence}>
        &times;
      </a>
    </small>;
  },
  
  onDeleteCompetence(e){
    e.preventDefault();
    queryActions.setCompetenceLevel(this.props.competence.id, null, false);
  }
  
});
