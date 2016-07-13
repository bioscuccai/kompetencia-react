"use strict";

import React from 'react';
import alt from '../../alt/alt';
import availabilityStore from '../../stores/availability_store';
import availabilityActions from '../../actions/availability_actions';
import userStore from '../../stores/user_store';

import Availability from './Availability.jsx';
import NewAvailability from './NewAvailability.jsx';
import Loading from '../Loading.jsx';
import UserBulletpoints from '../user/UserBulletpoints.jsx';

import modalStyle from '../../styles/modal';
import Modal from 'react-modal';
import auth from '../../lib/auth';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
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
    userStore.listen(this.handleUserStoreChange);
    this.fetch(this.props);
  },
  
  fetch(props){
    availabilityActions.setUserId(parseInt(props.params.profileUserId));
    availabilityStore.fetchAvailabilities(parseInt(props.params.profileUserId));
    userStore.fetchProfileUser(parseInt(props.params.profileUserId));
  },
  
  componentWillReceiveProps(props){
    console.log("change");
    this.fetch(props);
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
    
    let newAvailabilityButton;
    if(auth.canAlterAvailabilityOf(this.state.profileUser, this.context.currentUser)){
      newAvailabilityButton=<span>
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
      </span>;
    }
    
    return <div>
      <h1>Rendelkezésreállások</h1>
      <blockquote>
        <UserBulletpoints user={this.state.profileUser}></UserBulletpoints>
      </blockquote>
      <table>
        <thead>
          <tr>
            <th>Kezdés</th>
            <th>Befejezés</th>
            <th>Komment</th>
            <th><i className='icon ion-android-time' title='Munkaórák'></i></th>
            <th title='Valószínűség'>%</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {this.state.availabilities.map(availability=>{
            return <Availability
              availability={availability}
              key={`availability-${availability.id}`}
              profileUser={this.state.profileUser}></Availability>;
          })}
        </tbody>
      </table>
      {newAvailabilityButton}
      
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
