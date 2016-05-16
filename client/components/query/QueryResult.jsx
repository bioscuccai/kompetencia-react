"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import NewPersonRequest from '../person_requests/New.jsx';
import MatchedAvailabilities from './MatchedAvailabilities.jsx';
import UserModal from '../user/UserModal.jsx';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import _ from 'lodash';

import auth from '../../lib/auth';

export default React.createClass({
  getInitialState(){
    return {
      newModal: false,
      profileModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  onRequestCloseNew(){
    this.setState({
      newModal: false
    });
  },
  
  onNewModal(){
    this.setState({
      newModal: true
    });
  },
  
  onRequestCloseProfile(){
    this.setState({
      profileModal: false
    });
  },
  
  onProfileModal(){
    this.setState({
      profileModal: true
    });
  },
  
  render(){
    let requestButton;
    if(auth.canRequestUser(this.props.result, this.props.currentUser)){
      requestButton=<button onClick={this.onNewModal} className='icon-button icon-button-large'>
        <i className='icon ion-person-add'></i>
      </button>;
    }
    let highlightedIds=this.props.result.found.map(r=>r.competence_id);
    return <div className='result-box'>
      <div className='row'>
        <div className='column column-80'>
          <UserBulletPoints
            highlightedIds={highlightedIds}
            highlightedSkillIds={this.props.highlightedSkillIds}
            user={this.props.result}></UserBulletPoints>
          <MatchedAvailabilities matchedAvailabilities={this.props.result.matched_availabilities}></MatchedAvailabilities>
        </div>
        <div className='column column-20'>
          {requestButton}
          <button onClick={this.onProfileModal} className='icon-button ion-button-large'>
            <i className="icon ion-eye"></i>
          </button>
        </div>
      </div>
      
      <Modal
        isOpen={this.state.newModal}
        onRequestClose={this.onRequestCloseNew}
        style={modalStyle}>
        <NewPersonRequest
          currentUser={this.props.currentUser}
          onClose={this.onRequestCloseNew}
          profileUser={this.props.result}></NewPersonRequest>
      </Modal>
      
      <Modal
        isOpen={this.state.profileModal}
        onRequestClose={this.onRequestCloseProfile}
        style={modalStyle}>
        <UserModal allUsers={this.props.allUsers} profileUser={this.props.result}></UserModal>
      </Modal>
    </div>;
  }
});
