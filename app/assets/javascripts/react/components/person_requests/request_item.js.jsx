"use strict";

import React from 'react';
import RequestDetail from './request_detail.js.jsx';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import ConfirmedMarker from './confirmed_marker.js.jsx';

import requestActions from '../../actions/request_actions';

import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      detailModal: false
    };
  },
  
  onDetailModal(){
    this.setState({
      detailModal: true
    });
  },
  
  onRequestClose(){
    this.setState({
      detailModal: false
    });
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  render(){
    return <tr>
      <td>
        {this.props.request.target.email}
        <div><small>({_.get(this.props.request, "target.godfather.email")})</small></div>
      </td>
      <td>
        <h5>{this.props.request.description}</h5>
        {this.props.request.title}
      </td>
      <td>{this.props.request.starts_at} &mdash; {this.props.request.ends_at}</td>
      <td><ConfirmedMarker request={this.props.request}></ConfirmedMarker></td>
      <td>
        <button onClick={this.onDeleteRequest}>
          <i className='icon ion-trash-a'></i>
        </button>
        <button onClick={this.onDetailModal}>
          <i className='icon ion-eye'></i>
        </button>
        <button>
          <i className='icon ion-compose'></i>
        </button>
        <Modal isOpen={this.state.detailModal}
          onRequestClose={this.onRequestClose}
          style={this.modalStyle}>
          <RequestDetail request={this.props.request}></RequestDetail>
          <button onClick={this.onRequestClose}>Bezár</button>
        </Modal>
      </td>
    </tr>;
  },
  
  onDeleteRequest(e){
    e.preventDefault();
    requestActions.deleteRequest(this.props.request.user.id, this.props.request.id);
  }
});
