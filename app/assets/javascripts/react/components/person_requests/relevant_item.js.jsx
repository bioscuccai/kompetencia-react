"use strict";

import React from 'react';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

import RequestDetail from './request_detail.js.jsx';

import ConfirmedMarker from './confirmed_marker.js.jsx';
import _ from 'lodash';
import DateLabel from '../date/date_label.jsx';
import Collisions from './collisions.jsx';

import requestActions from '../../actions/request_actions';
import requestStore from '../../stores/request_store';

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
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  onCollision(){
    requestActions.resetCollisions();
    requestStore.fetchCollisions(this.props.request.user_id, this.props.request.starts_at, this.props.request.ends_at);
    this.onCollisionModal();
  },
  
  render(){
    return <tr>
      <td>{this.props.request.target.email}</td>
      <td>{this.props.request.user.email}</td>
      <td>
        <h5>{this.props.request.title}</h5>
        {this.props.request.comment}
      </td>
      <td>
        <DateLabel date={this.props.request.starts_at}></DateLabel>
        &mdash;
        <DateLabel date={this.props.request.ends_at}></DateLabel>
      </td>
      <td>
        <ConfirmedMarker request={this.props.request}></ConfirmedMarker>
      </td>
      <td>
        <button onClick={this.onDetailModal}>
          <i className='icon ion-eye'></i>
        </button>
        <button onClick={this.onCollision}>
          <i className='icon ion-checkmark'></i>
        </button>
        <Modal
          isOpen={this.state.collisionsModal}
          onRequestClose={this.onRequestCloseCollisionModal}
          style={this.modalStyle}>
          <Collisions collisions={this.props.collisions}></Collisions>
        </Modal>
        
        <button>
          <i className='icon ion-close'></i>
        </button>
        <Modal
          isOpen={this.state.detailModal}
          onRequestClose={this.onRequestClose}
          style={modalStyle}>
          <RequestDetail request={this.props.request}></RequestDetail>
        </Modal>
      </td>
    </tr>;
  }
});
