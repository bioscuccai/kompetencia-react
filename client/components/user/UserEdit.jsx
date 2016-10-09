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
      profileUser: null,
      godfathers: [],
      godfathersLoaded: false
    };
  },
  
  componentDidMount(){
    alt.recycle(userStore);
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileUser(this.context.currentUser.id);
    userStore.fetchGodfathers();
  },
  
  componentWillUnmount(){
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  render(){
    if(!this.state.profileUser || this.state.godfathers.length===0){
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
        
        <div className='row'>
          <div className='column column-40'>
            Mentor:
          </div>
          <div className='column column-60'>
            <select ref='godfatherId' defaultValue={this.state.profileUser.godfather_id}>
              <option value=""></option>
              {
                this.state.godfathers.map(godfather=>{
                  return <option key={`godfather-${godfather.id}`} value={godfather.id}>{godfather.name}</option>;
                })
              }
            </select>
          </div>
        </div>
        
        <div className='row'>
          <div className='column column-40'>
            Értesítő e-mailek:
          </div>
          <div className='column column-60'>
            <input type='checkbox' ref='receiveEmail' defaultChecked={this.state.profileUser.receive_email}></input>
          </div>
        </div>

        <div className='row'>
          <div className='column column-40'>
            E-mail lejárt feladott hirdetésekről:
          </div>
          <div className='column column-60'>
            <input type='checkbox' ref='mailForExpiredAvailabilities' defaultChecked={this.state.profileUser.mail_for_expired_availabilities}></input>
          </div>
        </div>

        <div className="row">
          <div className="column column-40">
            Értesítő e-mail sűrűség:
          </div>
          <div className="column column-60">
            <select name="freq" id="freq" ref="freq" defaultValue={this.state.profileUser.mail_frequency}>
              <option value="5min">5 perc</option>
              <option value="3hour">3 óra</option>
              <option value="12hour">12 óra</option>
              <option value="1day">1 nap</option>
              <option value="1week">1 hét</option>
            </select>
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
        
        <div className='top-gutter-100'></div>
        
        <div className='row'>
          <div className='column column-40'>
            <strong>Régi jelszó a profil módosításához:</strong>
          </div>
          <div className='column column-60'>
            <input type='password' ref='currentPassword'></input>
          </div>
        </div>
        
        <input type='submit' value='Módosítás'></input>
      </form>
      <h1>CV</h1>
      <form onSubmit={this.onUpload}>
        <div className='row'>
          <div className='column column-40'>
            CV:
          </div>
          <div className='column column-60'>
            <input type='file' ref='cvFile'></input>
          </div>
        </div>
        <input type='submit' value='Feltöltés'></input>
      </form>
    </div>;
  },
  
  handleUserStoreChange(state){
    this.context.profileUser=state.profileUser;
    this.setState({
      profileUser: state.profileUser,
      godfathers: state.godfathers
    });
  },
  
  onSubmit(e){
    e.preventDefault();
    if(!this.refs.currentPassword.value){
      NotificationManager.error('A módosításhoz szükséges a régi jelszó!');
      return;
    }
    userActions.editUser(this.refs.firstName.value, this.refs.lastName.value,
      this.refs.currentPassword.value,
      this.refs.newPassword.value, this.refs.newPasswordConfirmation.value,
      parseInt(this.refs.godfatherId.value),
      this.refs.receiveEmail.checked,
      this.refs.freq.value,
      this.refs.mailForExpiredAvailabilities.checked,
      this.context.currentUser.id
    )
    .then(data=>{
      console.log(data);
      if(_.get(data, 'data.status')==='ok'){
        NotificationManager.info("Sikeres módosítás");
      } else {
        NotificationManager.error("Hiba történt módosítás során");
      }
    });
  },
  
  onUpload(e){
    e.preventDefault();
    let formData=new FormData();
    console.log(this.refs.cvFile.files[0]);
    if(!this.refs.cvFile.files[0]){
      NotificationManager.error("Hiba a CV feltöltése közben");
      return;
    }
    formData.append("cv", this.refs.cvFile.files[0]);
    userActions.uploadCv(formData)
    .then(data=>{
      if(_.get(data, 'data.status')==='ok'){
        NotificationManager.info("CV feltöltve");
      } else {
        NotificationManager.error("Hiba a CV feltöltése közben");
        
      }
    })
    .catch(data=>{
      NotificationManager.error("Hiba a CV feltöltése közben");
    });
  }
});
