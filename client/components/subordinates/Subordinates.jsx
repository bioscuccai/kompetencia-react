"use strict";

import _ from 'lodash';

import React from 'react';
import userStore from '../../stores/user_store';
import NotSubordinateItem from './NotSubordinateItem.jsx';
import SubordinateItem from './SubordinateItem.jsx';
import Loading from '../Loading.jsx';
import Sort from '../Sort.jsx';
import alt from '../../alt/alt';

export default React.createClass({
  getInitialState(){
    return {
      allUsers: [],
      subordinates: [],
      sortedSubordinates: [],
      notSubordinates: [],
      filteredNotSubordinates: [],
      profileUser: null,
      
      subordinatesSortBy: 'name',
      subordinatesAsc: true,
      
      newSortBy: 'name',
      newAsc: true
    };
  },
  
  componentDidMount() {
    alt.recycle(userStore);
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
    return <div>
      <h2>Dolgozók</h2>
        <Sort fields={[
            {name: 'Név', value: 'name'},
            {name: 'Mentor', value: 'godfather_name'}
          ]}
          onChange={this.onSubordinateSortChange}
          initialDirection={true}
          ></Sort>
        {this.sortUsers(this.state.subordinates, this.state.subordinatesSortBy, this.state.subordinatesAsc).map(user=>{
        return <SubordinateItem
            key={`subordinate-${user.id}`}
            profileUser={this.state.profileUser}
            user={user}></SubordinateItem>;
      })}
      <h2>Új Dolgozó</h2>
        <Sort fields={[
            {name: 'Név', value: 'name'},
            {name: 'Mentor', value: 'godfather_name'}
          ]}
          onChange={this.onNewSortChange}
          initialDirection={true}
          ></Sort>
      <input type='text' ref='filter' placeholder='Szűrés' onChange={this.onFilterChange}></input>
      {this.sortUsers(this.state.filteredNotSubordinates, this.state.newSortBy, this.state.newAsc).map(user=>{
        return <NotSubordinateItem
            key={`not-subordinate-${user.id}`}
            profileUser={this.state.profileUser}
            user={user}></NotSubordinateItem>;
      })
      }
    </div>;
  },
  
  onSubordinateSortChange(order, asc){
    this.setState({
      subordinatesSortBy: order,
      subordinatesAsc: asc
    });
  },
  
  onNewSortChange(order, asc){
    this.setState({
      newSortBy: order,
      newAsc: asc
    });
  },
  
  sortUsers(users, order, asc){
    return _.orderBy(users, [item=>_.deburr(item[order] || '').toLowerCase()], [asc ? 'asc' : 'desc']);
  },
  
  handleStoreChange(state){
    let profileUser=state.profileUser;
    let allUsers=state.allUsers.filter(u=>u.id!==parseInt(this.props.params.profileUserId));
    let subordinates=allUsers.filter(u=>u.godfather_id===parseInt(this.props.params.profileUserId));
    let notSubordinates=allUsers.filter(u=>u.godfather_id!==parseInt(this.props.params.profileUserId));
    let filteredNotSubordinates=this.filterNotSubordinates(notSubordinates);
    this.setState({
      allUsers,
      subordinates,
      notSubordinates,
      profileUser,
      filteredNotSubordinates
    });
  },
  
  filterNotSubordinates(notSubordinates){
    if(!_.get(this.refs, "filter.value")){
      return notSubordinates;
    }
    return notSubordinates.filter(u=>(u.name || "").toUpperCase().includes(this.refs.filter.value.toUpperCase()));
  },
  
  onFilterChange(){
    this.setState({
      filteredNotSubordinates: this.filterNotSubordinates(this.state.notSubordinates)
    });
  }
});
