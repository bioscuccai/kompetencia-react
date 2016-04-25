"use strict";

import React from 'react';
import alt from '../../alt/alt';
import availabilityStore from '../../stores/availability_store';
import availabilityActions from '../../actions/availability_actions';
import userStore from '../../stores/user_store';

import Availability from './Availability.jsx';
import NewAvailability from './NewAvailability.jsx';
import Loading from '../Loading.jsx';

import modalStyle from '../../styles/modal';
import Modal from 'react-modal';

export default React.createClass({  
  getInitialState(){
    return {
      availabilities: [],
      newModal: false,
      profileUser: null
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  componentDidMount(){
    alt.recycle(availabilityStore, userStore);
    availabilityStore.listen(this.handleAvailabilityStoreChange);
    availabilityActions.setUserId(parseInt(this.props.params.profileUserId));
    availabilityStore.fetchAvailabilities(parseInt(this.props.params.profileUserId));
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileUser(parseInt(this.props.params.profileUserId));
  },
  
  componentWillUnmount(){
    availabilityStore.unlisten(this.handleAvailabilityStoreChange);
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  onNewModal(){
    //this.refs.newAvailability.reset();
    this.setState({
      newModal: true
    });
  },
  
  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    return <div>
      <h1>Elérhetőségek</h1>
      <table>
        <thead>
          <tr>
            <th>Kezdés</th>
            <th>Befejezés</th>
            <th>Komment</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {this.state.availabilities.map(availability=>{
            return <Availability availability={availability} key={`availability-${availability.id}`}></Availability>;
          })}
        </tbody>
      </table>
      <button onClick={this.onNewModal}>
        <i className='icon ion-plus'></i>
        Új...
      </button>
      <Modal
        isOpen={this.state.newModal}
        style={modalStyle}
        onRequestClose={this.onRequestClose}>
        <NewAvailability
          closeModal={this.onRequestClose}
          ref='newAvailability'
          user={this.state.profileUser}></NewAvailability>
        <button onClick={this.onRequestClose}>Bezár</button>
      </Modal>
      
    </div>;
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  },
  
  handleAvailabilityStoreChange(state){
    this.setState({
      availabilities: state.availabilities
    });
  },
  
  handleUserStoreChange(state){
    this.setState({
      profileUser: state.profileUser
    });
  }
});
