"use strict";

import React from 'react';
import Menu from './Menu.jsx';
import UserHeader from './UserHeader.jsx';
import Loading from '../Loading.jsx';

import appStore from '../../stores/app_store';


export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  getInitialState(){
    return {
      currentUser: null
    };
  },
  
  componentDidMount(){
    appStore.listen(this.handleAppStoreChange);
    appStore.fetchCurrentUser(this.context.currentUser.id);
  },
  
  componentWillUnmount(){
    appStore.unlisten(this.handleAppStoreChange);
  },
  
  render(){
    if(!this.state.currentUser){
      return <Loading></Loading>;
    }
    return <div>
      <UserHeader currentUser={this.state.currentUser}></UserHeader>
      <Menu currentUser={this.state.currentUser}></Menu>
    </div>;
  },
  
  handleAppStoreChange(state){
    this.setState({
      currentUser: state.currentUser
    });
  }
});
