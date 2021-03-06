"use strict";

import React from 'react';

import availabilityActions from '../../actions/availability_actions';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import auth from '../../lib/auth';

import AvailabilityEditor from './AvailabilityEditor.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  getInitialState(){
    return {
      editModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  render(){
    // if(!auth.canAlterAvailabilityOf(this.props.profileUser, this.context.currentUser)){
    //   return <span></span>;
    // }
    let stateButton;
    if(this.props.availability.active){
      stateButton=<button onClick={this.onTurnOff} alt='Kikapcsol' className='icon-button' title='Kikapcsol'>
        <i className='icon ion-close-circled'></i>
        </button>;
    } else {
      stateButton=<button onClick={this.onTurnOn} alt='Bekapcsol' className='icon-button' title='Bekapcsol'>
        <i className='icon ion-checkmark-circled'></i>
        </button>;
    }
    
    return <span>
      {stateButton}
      <button onClick={this.onEditModal} className='icon-button' title='Szerkeszt'>
        <i className='icon ion-compose'></i>
      </button>
      <Modal
        isOpen={this.state.editModal}
        onRequestClose={this.onRequestClose}
        style={modalStyle}>
        <AvailabilityEditor availability={this.props.availability} onClose={this.onRequestClose}></AvailabilityEditor>
      </Modal>
      
      <button onClick={this.onDelete} className='icon-button' title='Töröl'>
        <i className='icon ion-trash-a'></i>
      </button>
    </span>;
  },
  
  onTurnOn(){
    availabilityActions.turnOnAvailability(this.props.availability.user_id, this.props.availability.id).then(data=>{
      NotificationManager.info("Rendelkezésreállás bekapcsolva");
    });
  },
  
  onTurnOff(){
    availabilityActions.turnOffAvailability(this.props.availability.user_id, this.props.availability.id).then(data=>{
      console.log(data);
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Rendelkezésreállás kikapcsolva");
      } else {
        NotificationManager.error("Hiba történt");
      }
    });
  },
  
  onDelete(){
    availabilityActions.deleteAvailability(this.props.availability.user_id, this.props.availability.id).then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Rendelkezésreállás törölve");
      } else {
        NotificationManager.error("Hiba történt");
      }
    });
  },
  
  onEditModal(){
    this.setState({
      editModal: true
    });
  },
  
  onRequestClose(){
    this.setState({
      editModal: false
    });
  }
});
