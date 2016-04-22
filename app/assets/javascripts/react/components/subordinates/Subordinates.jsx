"use strict";

import React from 'react';
import userStore from '../../stores/user_store';
import NotSubordinateItem from './NotSubordinateItem.jsx';
import SubordinateItem from './SubordinateItem.jsx';

export default React.createClass({
  getInitialState(){
    return {
      allUsers: [],
      subordinates: [],
      notSubordinates: [],
      filteredNotSubordinates: []
    };
  },
  
  componentDidMount() {
    userStore.listen(this.handleStoreChange);
    userStore.fetchAllUsers();
  },
  
  componentWillUnmount() {
    userStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    return <div>
      <h2>Família</h2>
      {this.state.subordinates.map(user=>{
        return <SubordinateItem
            key={`subordinate-${user.id}`}
            profileUser={this.props.profileUser}
            user={user}></SubordinateItem>;
      })}
      <h2>Új családtag</h2>
      <input type='text' ref='filter' placeholder='Szűrés' onChange={this.onFilterChange}></input>
      {this.state.notSubordinates.map(user=>{
        return <NotSubordinateItem
            key={`not-subordinate-${user.id}`}
            profileUser={this.props.profileUser}
            user={user}></NotSubordinateItem>;
      })
      }
    </div>;
  },
  
  handleStoreChange(state){
    let allUsers=state.allUsers;
    let subordinates=allUsers.filter(u=>u.godfather_id===this.props.profileUser.id);
    let notSubordinates=allUsers.filter(u=>u.godfather_id!==this.props.profileUser.id);
    let filteredNotSubordinates=notSubordinates;
    this.setState({
      allUsers,
      subordinates,
      notSubordinates
    });
  },
  
  onFilterChange(){
    
  }
});
