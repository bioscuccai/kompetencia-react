"use strict";

import React from 'react';

import userActions from '../../actions/user_actions';
import auth from '../../lib/auth';

export default React.createClass({
  render(){
    let adminButton;
    let godfatherButton;
    
    if(auth.canAlterRoles(this.props.profileUser)){
      if(this.props.user.is_admin){
        adminButton=<button title='Adminná teszem' className='admin-button' onClick={this.onRevokeAdmin}><i className='icon ion-minus'></i> admin</button>;
      } else {
        adminButton=<button title='Adminságot elveszem' className='admin-button' onClick={this.onMakeAdmin}><i className='icon ion-plus'></i> admin</button>;
      }
      
      if(this.props.user.is_godfather){
        godfatherButton=<button title='Kersztapává teszem' className='admin-button' onClick={this.onRevokeGodfather}><i className='icon ion-minus'></i> keresztapa</button>;
      } else {
        godfatherButton=<button title='Keresztapaságot elveszem' className='admin-button' onClick={this.onMakeGodfather}><i className='icon ion-plus'></i> keresztapa</button>;
      }
    }
    return <div>
      {godfatherButton}
      {adminButton}
    </div>;
  },
  
  onMakeAdmin(){
    userActions.makeAdmin(this.props.user.id);
  },
  
  onRevokeAdmin(){
    userActions.revokeAdmin(this.props.user.id);
  },
  
  onMakeGodfather(){
    userActions.makeGodfather(this.props.user.id);
  },
  
  onRevokeGodfather(){
    userActions.revokeGodfather(this.props.user.id);
  }
});
