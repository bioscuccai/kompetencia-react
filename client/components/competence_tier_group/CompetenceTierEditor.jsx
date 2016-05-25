"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';
import EditorBar from '../EditorBar.jsx';
import _ from 'lodash';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input ref='title' type='text' defaultValue={this.props.tier.title}></input>
    </EditorBar>;
  },
  
  onSave(){
    competenceTierActions.updateTier(this.props.tier.id, this.refs.title.value, this.props.tier.level)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Válasz módosítva");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  },
  
  onDelete(){
    competenceTierActions.deleteTier(this.props.tier.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Válasz törölve");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  }
});
