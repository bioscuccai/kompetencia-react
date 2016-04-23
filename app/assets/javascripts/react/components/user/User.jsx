"use strict";

import React from 'react';
import {Link} from 'react-router';
import userStore from '../../stores/user_store';
import Loading from '../Loading.jsx';
import alt from '../../alt/alt';
import _ from 'lodash';

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
      availabilityMarker=<span>A felhasználó ELÉRHETŐ</span>;
    }
    
    let godfatherMarker;
    
    let adminMarker;
    if(this.state.profileUser.is_admin){
      adminMarker=<span>A felhasználó adinisztrátor</span>;
    }
    
    return <div>
      <h1>{this.state.profileUser.email}</h1>
      
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
