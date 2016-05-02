"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';
import EditorBar from '../EditorBar.jsx';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input ref='title' type='text' defaultValue={this.props.group.title}></input>
    </EditorBar>;
  },
  
  onSave(){
    competenceTierActions.updateTierGroup(this.props.group.id, this.refs.title.value).then(data=>{
      NotificationManager.info("Válasz típus módosítva");
    });
  },
  
  onDelete(){
    competenceTierActions.deleteTierGroup(this.props.group.id).then(data=>{
      NotificationManager.info("Válasz típus törölve");
    });
  }
});
