"use strict";

import React from 'react';
import axios from 'axios';

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
      //allUsers: [],
      subordinates: []
    };
  },
  
  componentDidMount(){
    alt.recycle(requestStore, availabilityStore, userStore);
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileUser(parseInt(this.props.params.profileUserId));
    //userStore.fetchAllUsers();
    userStore.fetchSubordinates(parseInt(this.props.params.profileUserId));
    requestStore.listen(this.handleRequestStoreChange);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
    availabilityActions.setGodfatherId(parseInt(this.props.params.profileUserId));
    requestStore.fetchRequested(parseInt(this.props.params.profileUserId));
    requestStore.fetchRelevant(parseInt(this.props.params.profileUserId));
    availabilityStore.fetchGodfatherAvailabilities(parseInt(this.props.params.profileUserId));
    
    this.notifyRequested();
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
      <Tabs onSelect={this.onSelect}>
        <TabList>
          <Tab>Én kértem {this.state.requested.length===0 ? '' : `(${this.state.requested.length})`}</Tab>
          <Tab>Tőlem kérték {this.state.relevant.length===0 ? '' : `(${this.state.relevant.length})`}</Tab>
          <Tab>Hirdetéseim {this.state.godfatherAvailabilities.length===0 ? '' : `(${this.state.godfatherAvailabilities.length})`}</Tab>
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
      subordinates: state.subordinates
      //allUsers: state.allUsers,
      //subordinates: state.allUsers.filter(u=>u.godfather_id===parseInt(this.props.params.profileUserId))
    });
  },
  
  onSelect(index){
    if(index===0){ //requested
      this.notifyRequested();
    }
    if(index===1){
      this.notifyRelevant();
    }
  },
  
  notifyRelevant(){
    axios.get("/users/notify_seen_relevant", {responseType: 'json'})
      .then(data=>{});
  },
  
  notifyRequested(){
    axios.get("/users/notify_seen_requested", {responseType: 'json'})
      .then(data=>{});
  }
});
