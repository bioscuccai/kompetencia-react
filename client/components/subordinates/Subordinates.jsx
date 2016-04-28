"use strict";

import _ from 'lodash';

import React from 'react';
import userStore from '../../stores/user_store';
import NotSubordinateItem from './NotSubordinateItem.jsx';
import SubordinateItem from './SubordinateItem.jsx';
import Loading from '../Loading.jsx';

export default React.createClass({
  getInitialState(){
    return {
      allUsers: [],
      subordinates: [],
      notSubordinates: [],
      filteredNotSubordinates: [],
      profileUser: null
    };
  },
  
  componentDidMount() {
    userStore.listen(this.handleStoreChange);
    userStore.fetchAllUsers();
    userStore.fetchProfileUser(this.props.params.profileUserId);
  },
  
  componentWillUnmount() {
    userStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    //ha nincs meg a lekert user profilja
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    console.log(this.state);
    return <div>
      <h2>Dolgozók</h2>
      {this.state.subordinates.map(user=>{
        return <SubordinateItem
            key={`subordinate-${user.id}`}
            profileUser={this.state.profileUser}
            user={user}></SubordinateItem>;
      })}
      <h2>Új Dolgozó</h2>
      <input type='text' ref='filter' placeholder='Szűrés' onChange={this.onFilterChange}></input>
      {this.state.notSubordinates.map(user=>{
        return <NotSubordinateItem
            key={`not-subordinate-${user.id}`}
            profileUser={this.state.profileUser}
            user={user}></NotSubordinateItem>;
      })
      }
    </div>;
  },
  
  handleStoreChange(state){
    console.log(this.props.params);
    console.log(state);
    let profileUser=state.profileUser;
    let allUsers=state.allUsers.filter(u=>u.id!==parseInt(this.props.params.profileUserId));
    let subordinates=allUsers.filter(u=>u.godfather_id===parseInt(this.props.params.profileUserId));
    let notSubordinates=allUsers.filter(u=>u.godfather_id!==parseInt(this.props.params.profileUserId));
    let filteredNotSubordinates=notSubordinates;
    this.setState({
      allUsers,
      subordinates,
      notSubordinates,
      profileUser
    });
  },
  
  onFilterChange(){
    
  }
});
