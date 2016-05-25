"use strict";

import React from 'react';
import competenceActions from '../../actions/competence_actions';
import auth from '../../lib/auth';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  render(){
    let removeButton=null;
    let pendingButton=null;
    //if(this.props.competence.isAssigned && auth.canDeleteCompetenceOf(this.props.user, this.props.currentUser)){
    if(auth.canDeleteCompetenceOf(this.props.user, this.props.currentUser)){
      removeButton=<a className='button' href="#" onClick={this.removeAssigned} title='Töröl'>
        <i className='icon ion-trash-a'></i>
      </a>;
    }
    if(this.props.competence.isPending && auth.canAcceptCompetenceOf(this.props.user, this.props.currentUser)){
      pendingButton=<span>
        <a href="#" className='button' onClick={this.rejectPending} title='Visszautasít'><i className='icon ion-close'></i></a>
        <a href="#" className='button' onClick={this.acceptPending} title='Elfogad'><i className='icon ion-checkmark'></i></a>
      </span>;
    }
    return <span>
      {removeButton}
      {pendingButton}
    </span>;
  },
  
  removeAssigned(e){
    e.preventDefault();
    competenceActions.removeAssigned(this.props.competence.id, this.props.user.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Kompetencia eltávolítva");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  },
  
  rejectPending(e){
    e.preventDefault();
    competenceActions.rejectPending(this.props.competence.id, this.props.user.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Kompetencia elutasítva");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  },
  
  acceptPending(e){
    e.preventDefault();
    competenceActions.acceptPending(this.props.competence.id, this.props.user.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Siker");
      } else {
        NotificationManager.error("Hiba");
      }
    });
  }
});
