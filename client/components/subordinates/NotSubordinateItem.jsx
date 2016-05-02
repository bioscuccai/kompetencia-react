"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import userActions from '../../actions/user_actions';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  render(){
    return <div className="row profile-item">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
      <div className="column column-20">
        <button onClick={this.onAddSubordinate} className='button icon-button' title='Felvétel'>
          <i className='icon ion-plus'></i>
        </button>
      </div>
    </div>;
  },
  
  onAddSubordinate(e){
    e.preventDefault();
    userActions.addSubordinate(this.props.profileUser.id, this.props.user.id).then(data=>{
      NotificationManager.info("Dolgozó felvéve");
    });
  }
});
