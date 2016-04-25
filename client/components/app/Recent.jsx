"use strict";

import React from 'react';
import {Link} from 'react-router';
import availabilityStore from '../../stores/availability_store';
import alt from '../../alt/alt';
import AnnouncedAvailability from '../availabilites/AnnouncedAvailability.jsx';

export default React.createClass({
  getInitialState(){
    return {
      recentAvailabilities: []
    };
  },
  
  componentDidMount(){
    alt.recycle(availabilityStore);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
    availabilityStore.fetchRecent();
  },
  
  componentWillUnmount(){
    availabilityStore.unlisten(this.handleAvailabilityStoreChange);
  },
  
  render(){
    return <div>
      <h1>Friss hirdetések</h1>
      {this.state.recentAvailabilities.map(availability=>{
        return <AnnouncedAvailability availability={availability} key={`announcement-${availability.id}`}></AnnouncedAvailability>;
      })}
    </div>;
  },
  
  handleAvailabilityStoreChange(state){
    this.setState({
      recentAvailabilities: state.recentAvailabilities
    });
  }
});
