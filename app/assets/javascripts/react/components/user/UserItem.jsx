"use strict";

import React from 'react';
import {Link} from 'react-router';

import UserBulletpoint from './UserBulletpoints.jsx';

export default React.createClass({
  render(){
    return <tr>
      <td>
        <UserBulletpoint user={this.props.user}></UserBulletpoint>
      </td>
      
      <td>
        <Link to={`/availabilities/${this.props.user.id}`} className='icon-button'>
          <i className='icon ion-clock'></i>
        </Link>
        
        <button className='icon-button'>
          <i className='icon ion-clock'></i>
        </button>
        
        <button className='icon-button'>
          <i className='icon ion-clock'></i>
        </button>
      </td>
    </tr>;
  }
});
