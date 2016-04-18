"use strict";

import React from 'react';
import availabilityStore from '../../stores/availability_store';
import availabilityActions from '../../actions/availability_actions';
import Availability from './availability.jsx';
import NewAvailability from './new_availability.jsx';
import modalStyle from '../../styles/modal';
import Modal from 'react-modal';

export default React.createClass({  
  getInitialState(){
    return {
      availabilities: [],
      newModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  componentDidMount(){
    availabilityStore.listen(this.handleStoreChange);
    availabilityActions.setUserId(this.props.user.id);
    availabilityStore.fetchAvailabilities(this.props.user.id);
  },
  
  componentWillUnmount(){
    availabilityStore.unlisten(this.handleStoreChange);
  },
  
  onNewModal(){
    //this.refs.newAvailability.reset();
    this.setState({
      newModal: true
    });
  },
  
  render(){
    return <div>
      <h1>Elérhetőségek</h1>
      <table>
        <thead>
          <tr>
            <th>Kezdés</th>
            <th>Befejezés</th>
            <th>Komment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.availabilities.map(availability=>{
            return <Availability availability={availability} key={`availability-${availability.id}`}></Availability>;
          })}
        </tbody>
      </table>
      <button onClick={this.onNewModal}>
        <span className='icon-button'>
          <i className='icon ion-plus'></i>
        </span>
        Új...</button>
      <Modal
        isOpen={this.state.newModal}
        style={modalStyle}
        onRequestClose={this.onRequestClose}>
        <NewAvailability
          closeModal={this.onRequestClose}
          ref='newAvailability'
          user={this.props.user}></NewAvailability>
        <button onClick={this.onRequestClose}>Bezár</button>
      </Modal>
      
    </div>;
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  },
  
  handleStoreChange(state){
    console.log("store change");
    this.setState({
      availabilities: state.availabilities
    });
  }
});
