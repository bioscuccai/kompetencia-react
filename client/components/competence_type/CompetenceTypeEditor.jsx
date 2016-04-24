"use strict";

import React from 'react';
import competenceTypeActions from '../../actions/competence_type_actions';

import EditorBar from '../EditorBar.jsx';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input type='text' ref='title' defaultValue={this.props.competenceType.title}></input>
    </EditorBar>;
  },
  
  onSave(){
    console.log(this.refs.title.value);
    competenceTypeActions.updateCompetenceType(this.props.competenceType.id, this.refs.title);
  },
  
  onDelete(){
    
  }
});