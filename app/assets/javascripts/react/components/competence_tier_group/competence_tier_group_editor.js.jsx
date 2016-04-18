"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';

export default React.createClass({
  render(){
    return <div className='row'>
      <div className='column column-50'>
        <input ref='title' type='text' defaultValue={this.props.group.title}></input>
      </div>
      <div className='column column-50'>
        <button onClick={this.onSave} className='icon-button'>
          <i className='icon ion-checkmark'></i>
        </button>
        <button onClick={this.onDelete} className='icon-button'>
          <i className='icon ion-trash-a'></i>
        </button>
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
