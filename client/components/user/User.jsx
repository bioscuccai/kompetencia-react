"use strict";

import React from 'react';
import {Link} from 'react-router';
import userStore from '../../stores/user_store';
import Loading from '../Loading.jsx';
import alt from '../../alt/alt';
import _ from 'lodash';
import UserBulletpoints from './UserBulletpoints.jsx';
import classnames from 'classnames';
import auth from '../../lib/auth';


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  
  getInitialState(){
    return {
      profileUser: null,
      allUsers: [],
      subordinates: []
    };
  },
  
  componentDidMount(){
    alt.recycle(userStore);
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchAllUsers(); //TODO: ideiglenesen a felhasznalo dolgozoi listazasahoz
    userStore.fetchProfileUser(parseInt(this.props.params.profileUserId));
  },
  
  componentWillUnmount(){
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    
    let availabilityMarker;
    if(this.state.profileUser.available){
      availabilityMarker=<h3 className='available-label'>A felhasználó ELÉRHETŐ</h3>;
    } else {
      availabilityMarker=<h3>A felhasználó foglalt</h3>;
    }
    
    let godfatherMarker;
    
    let subordinateMarker;
    if(this.state.profileUser.is_godfather){
      subordinateMarker=<div>
        <h3>A felhasználó keresztapa</h3>
        <div>A dolgozói: </div>
        {this.state.subordinates.map(user=>{
          return <div className='profile-item' key={`subordinate-${user.id}`}>
              <UserBulletpoints user={user}></UserBulletpoints>
            </div>;
        })}
      </div>;
    }
    
    let profileButton;
    if(this.context.currentUser.id==this.state.profileUser.id){
      profileButton=<a href='/users/edit' className='button'><i className='icon ion-reply'></i>Profil módosítás</a>;
    }
    
    let availabilitySection;
    if(auth.canSeeAvailabilities(this.context.currentUser)){
      availabilitySection=<div className='clearfix'>
        <div className='float-left'>
          {availabilityMarker}
        </div>
        <div className='float-right'>
          <Link to={`/availabilities/${this.state.profileUser.id}`} className='button'>Rendelkezésre állások&raquo;</Link>
        </div>
      </div>;
    }
    
    let adminMarker;
    if(this.state.profileUser.is_admin){
      adminMarker=<h3>A felhasználó adminisztrátor</h3>;
    }
    
    return <div>
      <div className='clearfix'>
        <div className='float-left'>
          <h1>{this.state.profileUser.name} <small>{this.state.profileUser.email}</small></h1>
        </div>
        <div className='float-right'>
          {profileButton}
        </div>
      </div>
      
      <div className='clearfix'>
        <div className='float-left'>
          <h3>Kompetenciák</h3>
          <ul>
            {this.state.profileUser.competences.map(competence=>{
              return <li key={`competence-${competence.id}`}>{competence.title} <small>({competence.level})</small></li>;
            })}
          </ul>
        </div>
        <div className='float-right'>
          <Link to={`/competence_chooser/${this.state.profileUser.id}`} className='button'>
            Kompetenciák&raquo;
          </Link>
        </div>
      </div>
      
      <div>
        {adminMarker}
      </div>
      
      {availabilitySection}
      
      <div>
        {subordinateMarker}
      </div>
    </div>;
  },
  
  handleUserStoreChange(state){
    console.log(state);
    this.setState({
      profileUser: state.profileUser,
      allUsers: state.allUsers,
      subordinates: state.allUsers.filter(u=>u.godfather_id===parseInt(this.props.params.profileUserId))
    });
  }
});
