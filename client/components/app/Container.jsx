"use strict";

import React from 'react';
import {Link} from 'react-router';
import Menu from './Menu.jsx';
import UserHeader from './UserHeader.jsx';
import Sidebar from './Sidebar.jsx';
import {NotificationContainer, NotificationManager} from 'react-notifications';
require("react-notifications/lib/notifications.css");

export default React.createClass({
  render(){
    return <div>
      <div className='row'>
        <aside className='column column-20'>
          <Sidebar></Sidebar>
        </aside>
        <main className='column column-80'>
          {this.props.children}
        </main>
      </div>
      <NotificationContainer></NotificationContainer>
    </div>;
  }
});
