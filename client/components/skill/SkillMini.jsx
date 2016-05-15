"use strict";

import competenceActions from '../../actions/competence_actions';

import {NotificationManager} from 'react-notifications';

import React from 'react';

import auth from '../../lib/auth';
import classnames from 'classnames';

export default React.createClass({
  render(){
    let skillClass=classnames({
      'skill-mini': true,
      'skill-pending': !this.props.skill.confirmed
    });
    
    let confirmButton;
    if(!this.props.skill.confirmed && auth.canConfirmUserSkill(this.props.profileUser, this.props.currentUser)){
      confirmButton=<button className='icon-button' onClick={this.onConfirmSkill}>
        <i className='icon ion-checkmark'></i>
      </button>;
    }
    
    let removeButton;
    if(auth.canRemoveUserSkill(this.props.profileUser, this.props.currentUser)){
      removeButton=<button className='icon-button' onClick={this.onRemoveSkill}>
        <i className='icon ion-trash-a'></i>
      </button>;
    }
    
    return <span className={skillClass}>
      {this.props.skill.name}
      {confirmButton}
      {removeButton}
    </span>;
  },
  
  onConfirmSkill(){
    competenceActions.confirmSkill(this.props.profileUser.id, this.props.skill.id)
    .then(data=>{
      NotificationManager.info("Skill elfogadva");
    });
  },
  
  onRemoveSkill(){
    competenceActions.removeSkill(this.props.profileUser.id, this.props.skill.id)
    .then(data=>{
      NotificationManager.info("Skill törölve");
    });
  }
});
