"use strict";

import React from 'react';
import {Link} from 'react-router';

import UserBulletpoint from './UserBulletpoints.jsx';
import UserAdministrationButtons from './UserAdministrationButtons.jsx';

export default React.createClass({
  render(){
    let adminMarker;
    let godfatherMarker;
    if(this.props.user.is_godfather){
      godfatherMarker=<span>Mentor</span>;
    }
    if(this.props.user.is_admin){
      adminMarker=<span>Admin</span>;
    }
    
    return <tr>
      <td>
        <UserBulletpoint user={this.props.user}></UserBulletpoint>
      </td>
      
      <td>
        <div>{adminMarker}</div>
        <div>{godfatherMarker}</div>
      </td>
      
      <td>
        <Link to={`/availabilities/${this.props.user.id}`} className='button icon-button' title='Rendelkezésreállás'>
          <i className='icon ion-clock'></i>
        </Link>
        
        <Link to={`/competence_chooser/${this.props.user.id}`} className='button icon-button' title='Kompetenciák'>
          <i className='icon ion-android-color-palette'></i>
        </Link>
        
        <UserAdministrationButtons user={this.props.user} profileUser={this.props.profileUser}></UserAdministrationButtons>
      </td>
    </tr>;
  }
});
