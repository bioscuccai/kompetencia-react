"use strict";

import React from 'react';

import competenceTierActions from '../../actions/competence_tier_actions.js.jsx';

export default React.createClass({
  render(){
    return <div>
      <h5>Új sablon</h5>
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <input ref='title' type='text' placeholder='Cím'></input>
        </div>
        <div>
          <input ref='description' type='text' placeholder='Leírás'></input>
        </div>
        <div>
          <input type='submit' value='Új típus'></input>
        </div>
      </form>
      <button onClick={this.onClose}>Bezár</button>
    </div>;
  },

  handleFormSubmit(e){
    e.preventDefault();
    console.log({
      title: this.refs.title.value,
      description: this.refs.description.value
    });
    competenceTierActions.createCompetenceTierGroup(this.refs.title.value, this.refs.description.value);
  },
  
  onClose(){
    if(this.props.closeModal){
      this.props.closeModal();
    }
  }
});
