"use strict";

import React from 'react';

import availabilityActions from '../../actions/availability_actions';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

import AvailabilityEditor from './AvailabilityEditor.jsx';

export default React.createClass({
  getInitialState(){
    return {
      editModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  render(){
    let stateButton;
    if(this.props.availability.active){
      stateButton=<button onClick={this.onTurnOff} alt='Kikapcsol' className='icon-button'>
        <i className='icon ion-close-circled'></i>
        </button>;
    } else {
      stateButton=<button onClick={this.onTurnOn} alt='Bekapcsol' className='icon-button'>
        <i className='icon ion-checkmark-circled'></i>
        </button>;
    }
    
    return <span>
      {stateButton}
      <button onClick={this.onEditModal} className='icon-button'>
        <i className='icon ion-compose'></i>
      </button>
      <Modal
        isOpen={this.state.editModal}
        onRequestClose={this.onRequestClose}
        style={modalStyle}>
        <AvailabilityEditor availability={this.props.availability} onClose={this.onRequestClose}></AvailabilityEditor>
      </Modal>
      
      <button onClick={this.onDelete} className='icon-button'>
        <i className='icon ion-trash-a'></i>
      </button>
    </span>;
  },
  
  onTurnOn(){
    availabilityActions.turnOnAvailability(this.props.availability.user_id, this.props.availability.id);
  },
  
  onTurnOff(){
    availabilityActions.turnOffAvailability(this.props.availability.user_id, this.props.availability.id);
  },
  
  onDelete(){
    availabilityActions.deleteAvailability(this.props.availability.user_id, this.props.availability.id);
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
