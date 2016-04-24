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
        <Link to={`/availabilities/${this.props.user.id}`} className='button icon-button' title='Rendelkezésreállás'>
          <i className='icon ion-clock'></i>
        </Link>
        
        <Link to={`/competence_chooser/${this.props.user.id}`} className='button icon-button' title='Kompetenciák'>
          <i className='icon ion-android-color-palette'></i>
        </Link>
      </td>
    </tr>;
  }
});
