"use strict";

import React from 'react';
import competenceTypeActions from '../../actions/competence_type_actions';

export default React.createClass({
  render(){
    return <form onSubmit={this.onFormSubmit}>
      <div className='row'>
        <div className='column column-80'>
          <input type='text' placeholder='Új kérdés' ref='title'></input>
        </div>
        <div className='column column-20'>
          <input type='submit' value='Új kérdés'></input>
        </div>
      </div>
      </form>;
  },
  
  onFormSubmit(e){
    e.preventDefault();
    competenceTypeActions.createCompetence(this.refs.title.value, this.props.competenceType.id);
    this.refs.title.value="";
    this.onClose();
  },
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
