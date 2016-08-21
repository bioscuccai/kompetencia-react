"use strict";

import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import availabilityStore from '../../stores/availability_store';
import alt from '../../alt/alt';
import Sort from '../Sort.jsx';
import AnnouncedAvailability from '../availabilites/AnnouncedAvailability.jsx';
import sorter from '../../lib/sorter';

export default React.createClass({
  getInitialState(){
    return {
      recentAvailabilities: [],
      sortBy: 'starts_at',
      asc: false
    };
  },
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  componentDidMount(){
    alt.recycle(availabilityStore);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
    availabilityStore.fetchRecent();
  },
  
  componentWillUnmount(){
    availabilityStore.unlisten(this.handleAvailabilityStoreChange);
  },
  
  onSortChange(sortBy, asc){
    this.setState({
      sortBy,
      asc
    });
  },
  
  render(){
    return <div>
      <h1>Friss hirdetések</h1>
      <Sort
        fields={[
          {name: 'Kezdés', value: 'starts_at'},
          {name: 'Név', value: 'name'},
          {name: 'Mentor', value: 'godfather_name'}
        ]}
        onChange={this.onSortChange}
        initialIndex={0}
        initialDirection={false}>
      </Sort>
      {sorter.sorted(this.state.recentAvailabilities, this.state.sortBy, this.state.asc).map(availability=>{
        return <AnnouncedAvailability 
          availability={availability}
          key={`announcement-${availability.id}`}
          currentUser={this.context.currentUser}></AnnouncedAvailability>;
      })}
    </div>;
  },
  
  handleAvailabilityStoreChange(state){
    this.setState({
      recentAvailabilities: state.recentAvailabilities
    });
  }
});
