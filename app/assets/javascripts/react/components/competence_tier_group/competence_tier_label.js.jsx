"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions.js.jsx';

export default React.createClass({
  render(){
    return <div onClick={this.onClick}>
      {this.props.tier.title}
    </div>;
  },
  
  onClick(){
    competenceTierActions.selectTier(this.props.tier.id);
  }
});
