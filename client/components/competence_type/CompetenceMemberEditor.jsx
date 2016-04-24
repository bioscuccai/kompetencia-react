"use strict";

import React from 'react';

import availabilityActions from '../../actions/competence_type_actions';
import EditorBar from '../EditorBar.jsx';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <input type='text' ref='title' defaultValue={this.props.competence.title}></input>
    </EditorBar>;
  },
  
  onSave(){
    
  },
  
  onDelete(e){
    
  }
});
