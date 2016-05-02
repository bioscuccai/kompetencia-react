"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';
import EditorBar from '../EditorBar.jsx';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input ref='title' type='text' defaultValue={this.props.tier.title}></input>
    </EditorBar>;
  },
  
  onSave(){
    competenceTierActions.updateTier(this.props.tier.id, this.refs.title.value, this.props.tier.level);
  },
  
  onDelete(){
    competenceTierActions.deleteTier(this.props.tier.id);
  }
});
