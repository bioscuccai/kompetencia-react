"use strict";

import React from 'react';
import userStore from '../../stores/user_store';
import UserItem from './UserItem.jsx';
import Loading from '../Loading.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  
  getInitialState(){
    return {
      allUsers: [],
      filteredUsers: [],
      profileUser: null //ide az aktualis user kerul
    };
  },
  
  componentDidMount(){
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchAllUsers();
    userStore.fetchProfileUser(parseInt(this.context.currentUser.id));
  },
  
  componentWillUnmount(){
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  handleUserStoreChange(state){
    this.setState({
      allUsers: state.allUsers,
      filteredUsers: this.filterNames(state.allUsers),
      profileUser: state.profileUser
    });
  },
  
  onFilterChange(){
    this.setState({
      filteredUsers: this.filterNames(this.state.allUsers)
    });
  },
  
  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    
    return <div>
      <h1>Felhasználók</h1>
      <input type='text' ref='filter' placeholder='Szűrő' onChange={this.onFilterChange}></input>
      <table>
        <thead>
          <tr>
            <th>
              Felhasználó
            </th>
            <th>
              Jogok
            </th>
            <th>
              Műveletek
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.filteredUsers.map(user=>{
            return <UserItem user={user} profileUser={this.state.profileUser} key={`user-${user.id}`}></UserItem>;
          })}
        </tbody>
      </table>
    </div>;
  },
  
  filterNames(users){
    if(!this.refs.filter){ //toltes kozben
      return users;
    }
    return users.filter(u=>u.name.contains(this.refs.filter.value));
  }
});
