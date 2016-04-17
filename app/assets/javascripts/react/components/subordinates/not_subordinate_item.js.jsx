"use strict";

import React from 'react';
import UserBulletPoints from './user_bulletpoints.js.jsx';
import userActions from '../../actions/user_actions.js.jsx';

export default React.createClass({
  render(){
    return <div className="row">
      <div className="column column-80">
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
      <div className="column column-20">
        <button onClick={this.onAddSubordinate}>+</button>        
      </div>
    </div>;
  },
  
  onAddSubordinate(e){
    e.preventDefault();
    userActions.addSubordinate(this.props.profileUser.id, this.props.user.id);
  }
});