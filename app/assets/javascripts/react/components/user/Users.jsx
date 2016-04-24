"use strict";

import React from 'react';
import userStore from '../../stores/user_store';
import UserItem from './UserItem.jsx';

export default React.createClass({
  getInitialState(){
    return {
      allUsers: [],
      filteredUsers: []
    };
  },
  
  componentDidMount(){
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchAllUsers();
  },
  
  componentWillUnmount(){
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  handleUserStoreChange(state){
    this.setState({
      allUsers: state.allUsers,
      filteredUsers: this.filterNames(state.allUsers)
    });
  },
  
  render(){
    return <div>
      <h1>Felhasználók</h1>
      <input type='text' ref='filter' placeholder='Szűrő'></input>
      <table>
        <thead>
          <tr>
            <th>
              Felhasználó
            </th>
            <th>
              Műveletek
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.allUsers.map(user=>{
            return <UserItem user={user} key={`user-${user.id}`}></UserItem>;
          })}
        </tbody>
      </table>
    </div>;
  },
  
  filterNames(users){
    return users;
  }
});

