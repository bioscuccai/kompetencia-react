"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import userActions from '../../actions/user_actions';
import {Link} from 'react-router';


export default React.createClass({
  render(){
    return <div className="row">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
      <div className="column column-20">
        <button onClick={this.onRemoveSubordinate} className='icon-button'>
          <i className='icon ion-trash-a'></i>
        </button>
        
        <Link to={`/availabilities/${this.props.user.id}`} className='button icon-button'>
          <i className='icon ion-clock'></i>
        </Link>
      </div>
    </div>;
  },
  onRemoveSubordinate(e){
    e.preventDefault();
    userActions.removeSubordinate(this.props.profileUser.id, this.props.user.id);
  }
});
