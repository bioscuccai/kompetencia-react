"use strict";

import React from 'react';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

import RequestDetail from './request_detail.js.jsx';

import ConfirmedMarker from './confirmed_marker.js.jsx';
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
      <td>{this.props.request.target.email}</td>
      <td>{this.props.request.user.email}</td>
      <td>
        <h5>{this.props.request.title}</h5>
        {this.props.request.comment}
      </td>
      <td>
        {this.props.request.starts_at} &mdash; {this.props.request.ends_at}
      </td>
      <td>
        <ConfirmedMarker request={this.props.request}></ConfirmedMarker>
      </td>
      <td>
        <button onClick={this.onDetailModal}>
          <i className='icon ion-eye'></i>
        </button>
        <button>
          <i className='icon ion-checkmark'></i>
        </button>
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
