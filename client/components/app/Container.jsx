"use strict";

import React from 'react';
import {Link} from 'react-router';
import Menu from './Menu.jsx';
import UserHeader from './UserHeader.jsx';
import NotificationSystem from 'react-notification-system';

export default React.createClass({
  render(){
    return <div>
      <div className='row'>
        <aside className='column column-20'>
          <UserHeader currentUser={this.props.currentUser}></UserHeader>
          <Menu></Menu>
        </aside>
        <main className='column column-80'>
          {this.props.children}
        </main>
      </div>
      <NotificationSystem ref='notificationSystem'></NotificationSystem>
    </div>;
  }
});
