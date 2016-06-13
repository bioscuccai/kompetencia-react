"use strict";

import React from 'react';
import auth from '../../lib/auth';
import {NotificationManager} from 'react-notifications';

import competenceActions from '../../actions/competence_actions';


export default React.createClass({
  render(){
    if(!auth.canAcceptCompetenceOf(this.props.profileUser, this.props.currentUser)){
      return <span></span>;
    }
    return <button onClick={this.onMassAccept}>Mind elfogad</button>;
  },
  
  onMassAccept(){
    let ids=this.props.competences.filter(competence=>{
      return competence.isPending;
    })
    .map(competence=>competence.id);
    console.log(ids);
    competenceActions.massAcceptPending(this.props.profileUser.id, ids)
    .then(data=>{
      NotificationManager.info("Siker");
    });
  }
});
