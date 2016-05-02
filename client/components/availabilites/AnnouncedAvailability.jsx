"use strict";

import React from 'react';
import UserBulletpoints from '../user/UserBulletpoints.jsx';
import DateLabel from '../date/DateLabel.jsx';
import auth from '../../lib/auth';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import NewPersonRequest from '../person_requests/New.jsx';

export default React.createClass({
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  },
  
  onRequestClick(){
    this.setState({
      newModal: true
    });
  },
  
  render(){
    let requestButton;
    if(auth.canRequestUsers(this.props.currentUser)){
      requestButton=<span>
          <button className='icon-button' onClick={this.onRequestClick}><i className='icon ion-person-add'></i></button>
          <Modal isOpen={this.state.newModal} style={modalStyle} onRequestClose={this.onRequestClose}>
            <NewPersonRequest
              currentUser={this.props.currentUser}
              onClose={this.onRequestClose}
              user={this.props.availability.user}>
            </NewPersonRequest>
          </Modal>
        </span>;
    }
    return <div className='row profile-item'>
      <div className='column column-60'>
        <UserBulletpoints user={this.props.availability.user}></UserBulletpoints>
      </div>
      <div className='column column-30'>
        <div>
          <small>
            <i className='icon ion-calendar'></i> <DateLabel date={this.props.availability.starts_at}></DateLabel> &mdash; <DateLabel date={this.props.availability.ends_at}></DateLabel>
          </small>
        </div>
        <div className='comment-preview'>
          {this.props.availability.comment}
        </div>
      </div>
      <div>
        {requestButton}
      </div>
    </div>;
  }
});
