"use strict";

import React from 'react';

import alt from '../../alt/alt';
import requestStore from '../../stores/request_store';
import availabilityStore from '../../stores/availability_store';
import availabilityActions from '../../actions/availability_actions';
import userStore from '../../stores/user_store';

import RequestItem from './RequestItem.jsx';
import RelevantItem from './RelevantItem.jsx';
import Collisions from './Collisions.jsx';
import GodfatherAvailabilityItem from './GodfatherAvailabilityItem.jsx';
import GodfatherResults from './GodfatherResults.jsx';
import RequestedResults from './RequestedResults.jsx';
import RelevantResults from './RelevantResults.jsx';
import Loading from '../Loading.jsx';

import {Tabs, Tab, TabList, TabPanel} from 'react-tabs';

export default React.createClass({
  getInitialState(){
    return {
      requested: [],
      relevant: [],
      godfatherAvailabilities: [],
      collisions: [],
      profileUser: null,
      allUsers: [],
      subordinates: []
    };
  },
  
  componentDidMount(){
    alt.recycle(requestStore, availabilityStore, userStore);
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileUser(parseInt(this.props.params.profileUserId));
    userStore.fetchAllUsers();
    requestStore.listen(this.handleRequestStoreChange);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
    availabilityActions.setGodfatherId(parseInt(this.props.params.profileUserId));
    requestStore.fetchRequested(parseInt(this.props.params.profileUserId));
    requestStore.fetchRelevant(parseInt(this.props.params.profileUserId));
    availabilityStore.fetchGodfatherAvailabilities(parseInt(this.props.params.profileUserId));
  },
  
  componentWillUnmount(){
    requestStore.unlisten(this.handleRequestStoreChange);
    availabilityStore.unlisten(this.handleAvailabilityStoreChange);
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    
    return <div>
      <h1>Hirdetések</h1>
      <Tabs>
        <TabList>
          <Tab>Én kértem</Tab>
          <Tab>Tőlem kérték</Tab>
          <Tab>Hirdetéseim</Tab>
        </TabList>
        
        <TabPanel>
          <RequestedResults
            profileUser={this.state.profileUser}
            requested={this.state.requested}
          ></RequestedResults>
        </TabPanel>
        
        
        <TabPanel>
          <RelevantResults
            profileUser={this.state.profileUser}
            relevant={this.state.relevant}
            collisions={this.state.collisions}
          ></RelevantResults>
        </TabPanel>
        
        
        <TabPanel>
          <GodfatherResults
            subordinates={this.state.subordinates}
            profileUser={this.state.profileUser}
            godfatherAvailabilities={this.state.godfatherAvailabilities}
          ></GodfatherResults>
        </TabPanel>
        
      </Tabs>
    </div>;
  },
  
  handleRequestStoreChange(state){
    this.setState({
      relevant: state.relevant,
      requested: state.requested,
      collisions: state.collisions
    });
  },
  
  handleAvailabilityStoreChange(state){
    this.setState({
      godfatherAvailabilities: state.godfatherAvailabilities
    });
  },
  
  handleUserStoreChange(state){
    this.setState({
      profileUser: state.profileUser,
      allUsers: state.allUsers,
      subordinates: state.allUsers.filter(u=>u.godfather_id===parseInt(this.props.params.profileUserId))
    });
  }
});
