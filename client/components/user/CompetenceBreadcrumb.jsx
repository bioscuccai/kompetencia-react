"use strict";

import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  render(){
    let highlightClass=this.props.highlight ? "mini-competence result-competence" : "mini-competence";
    highlightClass=classnames({
      'mini-competence': true,
      'result-competence': this.props.highlight,
      'pending-mini': this.props.pending
    });
    
    return <span
        className={highlightClass}>
          {this.props.competence.title} ({this.props.competence.level_title})
        </span>;
  }
});
