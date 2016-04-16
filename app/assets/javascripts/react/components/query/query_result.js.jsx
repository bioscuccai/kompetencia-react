"use strict";

import React from 'react';
import UserBulletPoints from '../subordinates/user_bulletpoints.js.jsx';
import NewPersonRequest from '../person_requests/new.js.jsx';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

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
    return <div className='result-box'>
      <div>
        <UserBulletPoints user={this.props.result}></UserBulletPoints>
      </div>
      <div>
        {this.props.result.found.map(found=>{
          return <span
              key={`result-competence-${this.props.result.id}-${found.competence_id}`}
              className='result-competence'>
            {found.title} ({found.level})
          </span>;
        })}
      </div>
      <div>
        <button onClick={this.onNewModal}><i className='icon ion-person-add'></i></button>
        <Modal
          isOpen={this.state.newModal}
          onRequestClose={this.onRequestClose}>
          <NewPersonRequest
            currentUser={this.props.currentUser}
            user={this.props.result}></NewPersonRequest>
        </Modal>
      </div>
    </div>;
  }
});
