"use strict";

import React from 'react';
import RequestDetail from './RequestDetail.jsx';
import RequestEdit from './RequestEdit.jsx';

import {Link} from 'react-router';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import ConfirmedMarker from './ConfirmedMarker.jsx';

import requestActions from '../../actions/request_actions';
import DateLabel from '../date/DateLabel.jsx';
import {NotificationManager} from 'react-notifications';

import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      detailModal: false,
      editModal: false
    };
  },
  
  onDetailModal(){
    this.setState({
      detailModal: true,
    });
  },
  
  onEditModal(){
    this.setState({
      editModal: true
    });
  },
  
  onDetailRequestClose(){
    this.setState({
      detailModal: false
    });
  },
  
  onEditRequestClose(){
    this.setState({
      editModal: false
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
        <div><small><i className='icon ion-star'></i>({_.get(this.props.request, "target.godfather.email")})</small></div>
      </td>
      <td>
        <h5>{this.props.request.title}</h5>
        <small className='comment-preview'>
          {this.props.request.comment}
        </small>
      </td>
      <td>
        <i className='icon ion-calendar'></i>
        <DateLabel date={this.props.request.starts_at}></DateLabel> &mdash; <DateLabel date={this.props.request.ends_at}></DateLabel>
      </td>
      <td>
        {this.props.request.chance}
      </td>
      <td><ConfirmedMarker request={this.props.request}></ConfirmedMarker></td>
      <td>
        <button onClick={this.onDeleteRequest} className='icon-button'>
          <i className='icon ion-trash-a'></i>
        </button>
        <button onClick={this.onDetailModal} className='icon-button'>
          <i className='icon ion-eye'></i>
        </button>

        <button onClick={this.onEditModal} className='icon-button'>
          <i className='icon ion-compose'></i>
        </button>

        <Modal isOpen={this.state.detailModal}
          onRequestClose={this.onDetailRequestClose}
          style={this.modalStyle}>
          <RequestDetail request={this.props.request}></RequestDetail>
          <button onClick={this.onDetailRequestClose}>Bezár</button>
        </Modal>
        
        <Modal isOpen={this.state.editModal}
          onRequestClose={this.onEditRequestClose}
          style={this.modalStyle}>
          <RequestEdit request={this.props.request}
            onClose={this.onEditRequestClose}></RequestEdit>
        </Modal>
      </td>
    </tr>;
  },
  
  onDeleteRequest(e){
    e.preventDefault();
    requestActions.deleteRequest(this.props.request.user.id, this.props.request.id, this.props.user.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Siker");
      } else {
        NotificationManager.error("Hiba történt");
      }
    })
    .catch(err=>{
      NotificationManager.error("Hiba történt! Részletek a konzolban");
      console.log(JSON.stringify(err, null, 2));
    });
  }
});
