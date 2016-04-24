"use strict";

import React from 'react';
import {Link} from 'react-router';
import availabilityStore from '../../stores/availability_store';
import alt from '../../alt/alt';

export default React.createClass({
  getInitialState(){
    return {
      recentAvailabilities: []
    };
  },
  
  componentDidMount(){
    alt.recycle(availabilityStore);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
  },
  
  componentWillUnmount(){
    this.unlisten(this.handleAvailabilityStoreChange);
  },
  
  render(){
    return <div>
      Recent
    </div>;
  },
  
  handleAvailabilityStoreChange(state){
    this.setState({
      recentAvailabilities: state.recentAvailabilities
    });
  }
});
