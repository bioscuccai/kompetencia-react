"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import userActions from '../../actions/user_actions';
import {Link} from 'react-router';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import DateTimeLabel from '../date/DateLabel.jsx';

export default React.createClass({
  render(){
    let pendingCompetenceNotification;
    if(this.props.user.pending_count!==0){
      pendingCompetenceNotification=<span className='pending-user-competence'>({this.props.user.pending_count})</span>;
    }
    
    return <div className="row profile-item">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
        <div>
          <i className='icon ion-calendar'></i>
          Utolsó módosítás:&nbsp;
          <DateTimeLabel date={this.props.user.last_changed}></DateTimeLabel>
        </div>
      </div>
      <div className="column column-20">
        <a onClick={this.onRemoveSubordinate} className='button icon-button' title='Eltávolítás'>
          <i className='icon ion-trash-a'></i>
        </a>
        
        <Link to={`/availabilities/${this.props.user.id}`} className='button icon-button' title='Rendelkezésreállás'>
          <i className='icon ion-clock'></i>
        </Link>
        
        <Link to={`/competence_chooser/${this.props.user.id}`} className='button icon-button' title='Kompetenciák'>
          <i className='icon ion-android-color-palette'></i>
          {pendingCompetenceNotification}
        </Link>
      </div>
    </div>;
  },
  onRemoveSubordinate(e){
    e.preventDefault();
    userActions.removeSubordinate(this.props.profileUser.id, this.props.user.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Dolgozó visszavonva");
      } else {
        NotificationManager.error("Hiba");
      }
    });
    
  }
});
