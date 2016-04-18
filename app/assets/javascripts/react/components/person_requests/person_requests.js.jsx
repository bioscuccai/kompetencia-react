"use strict";

import React from 'react';
import ReactTabs from 'react-tabs';

import requestStore from '../../stores/request_store';
import availabilityStore from '../../stores/availability_store';
import availabilityActions from '../../actions/availability_actions';

import RequestItem from './request_item.js.jsx';
import RelevantItem from './relevant_item.js.jsx';
import Collisions from './collisions.jsx';
import GodfatherAvailabilityItem from './godfather_availability_item.jsx';

import GodfatherResults from './godfather_results.jsx';
import RequestedResults from './requested_results.jsx';
import RelevantResults from './relevant_results.jsx';

export default React.createClass({
  getInitialState(){
    return {
      requested: [],
      relevant: [],
      godfatherAvailabilities: [],
      collisions: []
    };
  },
  
  componentDidMount(){
    requestStore.listen(this.handleRequestStoreChange);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
    availabilityActions.setGodfatherId(this.props.user.id);
    requestStore.fetchRequested(this.props.user.id);
    requestStore.fetchRelevant(this.props.user.id);
    availabilityStore.fetchGodfatherAvailabilities(this.props.user.id);
  },
  
  componentWillUnmount(){
    requestStore.unlisten(this.handleRequestStoreChange);
    availabilityStore.unlisten(this.handleAvailabilityStoreChange);
  },
  
  render(){
    return <div>
      <h1>Hírdetések</h1>
      <ReactTabs.Tabs>
        <ReactTabs.TabList>
          <ReactTabs.Tab>Én kértem (requested)</ReactTabs.Tab>
          <ReactTabs.Tab>Tőlem kérték (relevant)</ReactTabs.Tab>
          <ReactTabs.Tab>Hírdetéseim</ReactTabs.Tab>
        </ReactTabs.TabList>
        
        <ReactTabs.TabPanel>
          <RequestedResults
            user={this.props.user}
            requested={this.state.requested}
          ></RequestedResults>
        </ReactTabs.TabPanel>
        
        
        <ReactTabs.TabPanel>
          <RelevantResults
            user={this.props.user}
            relevant={this.state.relevant}
            collisions={this.state.collisions}
          ></RelevantResults>
        </ReactTabs.TabPanel>
        
        
        <ReactTabs.TabPanel>
          <GodfatherResults
            user={this.props.user}
            godfatherAvailabilities={this.state.godfatherAvailabilities}
          ></GodfatherResults>
        </ReactTabs.TabPanel>
        
      </ReactTabs.Tabs>
    </div>;
  },
  
  handleRequestStoreChange(state){
    console.log("request change");
    console.log(state.relevant);
    this.setState({
      relevant: state.relevant,
      requested: state.requested,
      collisions: state.collisions
    });
  },
  
  handleAvailabilityStoreChange(state){
    console.log(state.godfatherAvailabilities);
    this.setState({
      godfatherAvailabilities: state.godfatherAvailabilities
    });
  }
});
