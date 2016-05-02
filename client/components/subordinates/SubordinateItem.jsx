"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import userActions from '../../actions/user_actions';
import {Link} from 'react-router';
import {NotificationManager} from 'react-notifications';


export default React.createClass({
  render(){
    return <div className="row profile-item">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
      <div className="column column-20">
        <a onClick={this.onRemoveSubordinate} className='button icon-button' title='Eltávolítás'>
          <i className='icon ion-trash-a'></i>
        </a>
        
        <Link to={`/availabilities/${this.props.user.id}`} className='button icon-button' title='Rendelkezésreállás'>
          <i className='icon ion-clock'></i>
        </Link>
      </div>
    </div>;
  },
  onRemoveSubordinate(e){
    e.preventDefault();
    userActions.removeSubordinate(this.props.profileUser.id, this.props.user.id).then(data=>{
      NotificationManager.info("Dolgozó visszavonva");
    });
    
  }
});
