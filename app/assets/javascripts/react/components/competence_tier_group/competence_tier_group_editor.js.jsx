"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions.js.jsx';

export default React.createClass({
  render(){
    return <div className='row'>
      <div className='column column-50'>
        <input ref='title' type='text' defaultValue={this.props.group.title}></input>
      </div>
      <div className='column column-50'>
        <button onClick={this.onSave}>Mentés</button>
        <button onClick={this.onDelete}>Törlés</button>
      </div>
    </div>;
  },
  
  onSave(e){
    e.preventDefault();
    competenceTierActions.updateTierGroup(this.props.group.id, this.refs.title.value);
  },
  
  onDelete(e){
    e.preventDefault();
    competenceTierActions.deleteTierGroup(this.props.group.id);
  }
});
