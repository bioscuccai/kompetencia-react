"use strict";

import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  render(){
    let skillClass=classnames({
      'skill-mini': true,
      'skill-highlight': this.props.highlight
    });
    
    return <span className={skillClass}>
      {this.props.skill.name}
    </span>;
  }
});
