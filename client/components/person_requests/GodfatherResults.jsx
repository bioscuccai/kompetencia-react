"use strict";

import React from 'react';
import GodfatherAvailabilityItem from './GodfatherAvailabilityItem.jsx';
import NewAvailability from '../availabilites/NewAvailability.jsx';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

export default React.createClass({
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  render(){
    return <div>
      <h3>Meghírdetett</h3>
      <table>
        <thead>
          <tr>
            <th>Dolgozó</th>
            <th>Időtartam</th>
            <th>Komment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.godfatherAvailabilities.map(availability=>{
            return <GodfatherAvailabilityItem
              user={this.props.user}
              key={`godfather-availability-${availability.id}`}
              availability={availability}></GodfatherAvailabilityItem>;
          })}
        </tbody>
      </table>
      
      <button onClick={this.onNewAvailability}>
        <i className='icon ion-plus'></i>
        Új
      </button>
      <Modal
        isOpen={this.state.newModal}
        style={modalStyle}
        onRequestClose={this.onRequestClose}>
        <NewAvailability
          userList={this.props.subordinates}
          onClose={this.onRequestClose}></NewAvailability>
      </Modal>
    </div>;
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  },
  
  onNewAvailability(){
    this.setState({
      newModal: true
    });
  }
});
