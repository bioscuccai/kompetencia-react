"use strict";

import React from 'react';

import competenceTypeActions from '../../actions/competence_type_actions';
import {NotificationManager} from 'react-notifications';
import EditorBar from '../EditorBar.jsx';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input type='text' ref='title' defaultValue={this.props.competence.title}></input>
    </EditorBar>;
  },
  
  onSave(e){
    competenceTypeActions.updateCompetence(this.props.competence.id, this.refs.title.value).then(data=>{
      NotificationManager.info("Kompetencia módosítva");
    });
  },
  
  onDelete(e){
    competenceTypeActions.deleteCompetence(this.props.competence.id).then(data=>{
      NotificationManager.info("Kompetencia törlve");
    });
  }
});
