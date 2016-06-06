"use strict";

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  render(){
    let rights;
    if(this.props.currentUser.is_admin || this.props.currentUser.is_godfather){
      rights=<span>( {this.props.currentUser.is_admin?'Admin':''} {this.props.currentUser.is_godfather?'Mentor':''} )</span>;
    }
    
    return <div>
      <h5 className='no-margin'>{this.props.currentUser.name}</h5>
      <h6 className='no-margin'>{this.props.currentUser.email}</h6>
      {rights}
      <div className='menu-item'>
        <a href='/users/sign_out'><i className='icon ion-android-walk'></i> Kilépés</a>
      </div>
      <div className='small-spacer'></div>
      <div className='menu-item'>
        <Link to={`users/${this.props.currentUser.id}`}><i className='icon ion-person'></i> Profilom</Link>
      </div>
      
    </div>;
  }
});
