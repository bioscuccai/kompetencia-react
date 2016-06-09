"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';

export default React.createClass({
  render(){
    return <div onClick={this.onClick}>
      {this.props.tier.title}
      &nbsp;
      <small>{this.props.tier.description}</small>
    </div>;
  },
  
  onClick(){
    competenceTierActions.selectTier(this.props.tier.id);
  }
});
