"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import userActions from '../../actions/user_actions';

export default React.createClass({
  render(){
    return <div className="row">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
      <div className="column column-20">
        <button onClick={this.onRemoveSubordinate}>-</button>
        <a href={`/users/${this.props.user.id}/availabilities`} className='button icon-button'>
          <i className='icon ion-clock'></i>
        </a>
      </div>
    </div>;
  },
  onRemoveSubordinate(e){
    e.preventDefault();
    userActions.removeSubordinate(this.props.profileUser.id, this.props.user.id);
  }
});
