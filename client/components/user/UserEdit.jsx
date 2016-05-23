"use strict";

import React from 'react';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

import alt from '../../alt/alt';
import userStore from '../../stores/user_store';
import userActions from '../../actions/user_actions';

import Loading from '../Loading.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  
  getInitialState(){
    return {
      profileUser: null
    };
  },
  
  componentDidMount(){
    alt.recycle(userStore);
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileUser(this.context.currentUser.id);
  },
  
  componentWillUnmount(){
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    return <div>
      <h1>Profil módosítás</h1>
      <form onSubmit={this.onSubmit}>
        <div className='row'>
          <div className='column column-40'>
            Vezetéknév:
          </div>
          <div className='column column-60'>
            <input type='text' defaultValue={this.state.profileUser.last_name} ref='lastName'></input>
          </div>
        </div>
        
        <div className='row'>
          <div className='column column-40'>
            Keresztnév:
          </div>
          <div className='column column-60'>
            <input type='text' defaultValue={this.state.profileUser.first_name} ref='firstName'></input>
          </div>
        </div>
        
        <h2>Jelszó csere</h2>
        <div className='row'>
          <div className='column column-40'>
            Új jelszó:
          </div>
          <div className='column column-60'>
            <input type='password' ref='newPassword'></input>
          </div>
        </div>
        
        <div className='row'>
          <div className='column column-40'>
            Új jelszó mégegyszer:
          </div>
          <div className='column column-60'>
            <input type='password' ref='newPasswordConfirmation'></input>
          </div>
        </div>
        
        <div className='top-gutter-300'></div>
        
        <div className='row'>
          <div className='column column-40'>
            Régi jelszó:
          </div>
          <div className='column column-60'>
            <input type='password' ref='currentPassword'></input>
          </div>
        </div>
        <input type='submit' value='Módosítás'></input>
      </form>
      
    </div>;
  },
  
  handleUserStoreChange(state){
    this.setState({
      profileUser: state.profileUser
    });
  },
  
  onSubmit(e){
    e.preventDefault();
    userActions.editUser(this.refs.firstName.value, this.refs.lastName.value,
      this.refs.currentPassword.value,
      this.refs.newPassword.value, this.refs.newPasswordConfirmation.value
    )
    .then(data=>{
      console.log(data);
      if(_.get(data, 'data.status')==='ok'){
        NotificationManager.info("Sikeres módosítás");
      } else {
        NotificationManager.error("Hiba történt");
      }
    });
  }
});
