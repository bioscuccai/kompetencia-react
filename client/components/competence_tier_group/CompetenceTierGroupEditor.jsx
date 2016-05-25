"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';
import EditorBar from '../EditorBar.jsx';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input ref='title' type='text' defaultValue={this.props.group.title}></input>
    </EditorBar>;
  },
  
  onSave(){
    competenceTierActions.updateTierGroup(this.props.group.id, this.refs.title.value)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Siker");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  },
  
  onDelete(){
    competenceTierActions.deleteTierGroup(this.props.group.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Siker");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  }
});
