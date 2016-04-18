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
          <h3>Kérvényezett</h3>
          <table>
            <thead>
              <tr>
                <td>Név</td>
                <td>Munka</td>
                <td>Időtartam</td>
                <td>Állapot</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.requested.map(req=>{
                return <RequestItem
                  user={this.props.user}
                  key={`request-${req.id}`}
                  request={req}></RequestItem>;
              })}
            </tbody>
          </table>
        </ReactTabs.TabPanel>
        
        <ReactTabs.TabPanel>
          <h3>Beérkezett kérvények</h3>
          <table>
            <thead>
              <tr>
                <td>Név</td>
                <td>Kérvényező</td>
                <td>Munka</td>
                <td>Időtartam</td>
                <td>Állapot</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.relevant.map(request=>{
                return <RelevantItem
                  collisions={this.state.collisions}
                  key={`relevant-${request.id}`}
                  request={request}
                  user={this.props.user}></RelevantItem>;
              })}
            </tbody>
          </table>
        </ReactTabs.TabPanel>
        <ReactTabs.TabPanel>
          <h3>Meghírdetett</h3>
          <table>
            <thead>
              <tr>
                <th>Dolgozó</th>
                <th>Kezdés</th>
                <th>Befejezés</th>
                <th>Komment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.godfatherAvailabilities.map(availability=>{
                return <GodfatherAvailabilityItem
                  user={this.props.user}
                  key={`godfather-availability-${availability.id}`}
                  availability={availability}></GodfatherAvailabilityItem>;
              })}
            </tbody>
          </table>
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
