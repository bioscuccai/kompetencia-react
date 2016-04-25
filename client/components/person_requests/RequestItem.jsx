"use strict";

import React from 'react';
import RequestDetail from './RequestDetail.jsx';
import {Link} from 'react-router';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import ConfirmedMarker from './ConfirmedMarker.jsx';

import requestActions from '../../actions/request_actions';
import DateLabel from '../date/DateLabel.jsx';

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
        <Link to={`/users/${this.props.request.target.id}`}>
          {this.props.request.target.name}
          <div>
            <small>
              {this.props.request.target.email}
            </small>
          </div>
        </Link>
        <div><small>({_.get(this.props.request, "target.godfather.name")})</small></div>
      </td>
      <td>
        <h5>{this.props.request.title}</h5>
        <small>
          {this.props.request.comment}
        </small>
      </td>
      <td>
        <DateLabel date={this.props.request.starts_at}></DateLabel> &mdash; <DateLabel date={this.props.request.ends_at}></DateLabel>
      </td>
      <td><ConfirmedMarker request={this.props.request}></ConfirmedMarker></td>
      <td>
        <button onClick={this.onDeleteRequest} className='icon-button'>
          <i className='icon ion-trash-a'></i>
        </button>
        <button onClick={this.onDetailModal} className='icon-button'>
          <i className='icon ion-eye'></i>
        </button>

        <button className='icon-button'>
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
    requestActions.deleteRequest(this.props.request.user.id, this.props.request.id, this.props.user.id);
  }
});
