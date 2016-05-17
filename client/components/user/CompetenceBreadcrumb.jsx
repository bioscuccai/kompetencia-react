"use strict";

import React from 'react';

export default React.createClass({
  render(){
    let highlightClass=this.props.highlight ? "mini-competence result-competence" : "mini-competence";
    return <span
        className={highlightClass}>
          {this.props.competence.title} ({this.props.competence.level_title})
        </span>;
  }
});
