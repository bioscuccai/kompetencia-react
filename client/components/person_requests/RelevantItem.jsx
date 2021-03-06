"use strict";

import React from 'react';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import {Link} from 'react-router';
import _ from 'lodash';

import RequestDetail from './RequestDetail.jsx';

import ConfirmedMarker from './ConfirmedMarker.jsx';
import DateLabel from '../date/DateLabel.jsx';
import Collisions from './Collisions.jsx';

import requestActions from '../../actions/request_actions';
import requestStore from '../../stores/request_store';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  getInitialState(){
    return {
      detailModal: false,
      collisionsModal: false
    };
  },
  
  onDetailModal(){
    this.setState({
      detailModal: true
    });
  },
  
  onCollisionModal(){
    this.setState({
      collisionsModal: true
    });
  },
  
  onRequestClose(){
    this.setState({
      detailModal: false
    });
  },
  
  onRequestCloseCollisionModal(){
    this.setState({
      collisionsModal: false
    });
  },
  
  onReject(){
    requestActions.rejectRequest(this.props.request.user_id, this.props.request.id, this.props.user.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Felkérés visszavonva");
      } else {
        NotificationManager.error("Hiba történt");
      }
    });
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  onCollision(){
    requestActions.resetCollisions();
    requestStore.fetchCollisions(this.props.request.target_id, this.props.request.starts_at, this.props.request.ends_at);
    this.onCollisionModal();
  },
  
  render(){
    return <tr>
      <td>
        <Link to={`/users/${this.props.request.target.id}`}>
          {this.props.request.target.name}
          <div>
            <small>{this.props.request.target.email}</small>
          </div>
        </Link>
      </td>
      <td>
        <Link to={`/users/${this.props.request.user.id}`}>
          {this.props.request.user.name}
          <div>
            <small>
              {this.props.request.user.email}
            </small>
          </div>
        </Link>
      </td>
      <td>
        <h5>{this.props.request.title}</h5>
        <small className='comment-preview'>
          {this.props.request.comment}
        </small>
      </td>
      <td>
        <i className='icon ion-calendar'></i>
        &nbsp;
        <DateLabel date={this.props.request.starts_at}></DateLabel>
        &mdash;
        <DateLabel date={this.props.request.ends_at}></DateLabel>
      </td>
      <td>
        {this.props.request.chance}
      </td>
      <td>
        <ConfirmedMarker request={this.props.request}></ConfirmedMarker>
      </td>
      <td>
        <button onClick={this.onDetailModal} className='icon-button' title='Megtekint'>
          <i className='icon ion-eye'></i>
        </button>
        <button onClick={this.onCollision} className='icon-button' title='Elfogad / Visszautasít'>
          <i className='icon ion-checkmark'></i>
        </button>
        <Modal
          isOpen={this.state.collisionsModal}
          onRequestClose={this.onRequestCloseCollisionModal}
          style={this.modalStyle}>
          <Collisions
            user={this.props.user}
            onClose={this.onRequestCloseCollisionModal}
            request={this.props.request}
            collisions={this.props.collisions}></Collisions>
        </Modal>
        
        <button className='icon-button' onClick={this.onReject}>
          <i className='icon ion-close'></i>
        </button>
        <Modal
          isOpen={this.state.detailModal}
          onRequestClose={this.onRequestClose}
          style={modalStyle}>
          <RequestDetail request={this.props.request}
          onClose={this.onRequestClose}></RequestDetail>
        </Modal>
      </td>
    </tr>;
  }
});
