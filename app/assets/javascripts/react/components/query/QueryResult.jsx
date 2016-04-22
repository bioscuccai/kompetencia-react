"use strict";

import React from 'react';
import UserBulletPoints from '../user/UserBulletpoints.jsx';
import NewPersonRequest from '../person_requests/New.jsx';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  },
  
  onNewModal(){
    this.setState({
      newModal: true
    });
  },
  
  render(){
    let highlightedIds=this.props.result.found.map(r=>r.competence_id);
    return <div className='result-box'>
      <div className='row'>
        <div className='column column-80'>
          <UserBulletPoints
            highlightedIds={highlightedIds}
            user={this.props.result}></UserBulletPoints>
        </div>
        <div className='column column-20'>
          <button onClick={this.onNewModal} className='icon-button icon-button-large'><i className='icon ion-person-add'></i></button>
        </div>
      </div>
      
      <Modal
        isOpen={this.state.newModal}
        onRequestClose={this.onRequestClose}>
        <NewPersonRequest
          currentUser={this.props.currentUser}
          user={this.props.result}></NewPersonRequest>
      </Modal>
    </div>;
  }
});
