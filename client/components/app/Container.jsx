"use strict";

import React from 'react';
import {Link} from 'react-router';
import Menu from './Menu.jsx';
import UserHeader from './UserHeader.jsx';

export default React.createClass({
  render(){
    return <div className='row'>
      <div className='column column-20'>
        <UserHeader currentUser={this.props.currentUser}></UserHeader>
        <Menu></Menu>
      </div>
      <div className='column column-80'>
        {this.props.children}
      </div>
    </div>;
  }
});
