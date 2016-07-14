"use strict";

import React from 'react';

import UserBulletPoints from '../user/UserBulletpoints.jsx';
import DateTime from 'react-datetime';

import requestActions from '../../actions/request_actions';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      startsAt: null,
      endsAt: null
    };
  },
  
  onStartChange(md){
    console.log(md);
    this.setState({
      startsAt: md.toDate()
    });
  },
  
  onEndChange(md){
    this.setState({
      endsAt: md.toDate()
    });
  },
  
  onSubmit(e){
    e.preventDefault();
    requestActions.createRequest(this.props.currentUser.id, this.props.user.id,
      this.state.startsAt, this.state.endsAt,
      parseInt(this.refs.chance.value),
      this.refs.title.value, this.refs.comment.value)
      .then(data=>{
        if(_.get(data, "data.status")==="ok"){
          NotificationManager.info("Kérés létrehozva");
        } else {
          NotificationManager.error("Hiba");
        }
      });
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  
  onClose(){
    if(this.props.onClose){
      console.log("closing");
      this.props.onClose();
    }
  },
  
  render(){
    return <div>
      <div className='clearfix modal-title'>
        <div className='float-left'>
          <h1>
            {this.props.user.name}
          </h1>
        </div>
        <div className='float-right'>
          <button className='icon-button icon-button-large' onClick={this.onClose}>
            <i className='icon ion-close'></i>
          </button>
        </div>
      </div>
      <UserBulletPoints user={this.props.user}></UserBulletPoints>
      
      <form onSubmit={this.onSubmit}>
        Kezdés:
        <DateTime onChange={this.onStartChange}
          timeFormat={false}
          closeOnSelect={true}></DateTime>
        Befejezés:
        <DateTime onChange={this.onEndChange}
          timeFormat={false}
          closeOnSelect={true}></DateTime>
        Cím:
        <input type='text' ref='title'></input>
        Leírás:
        <textarea ref='comment'></textarea>
        Valószínűség:
        <input type='text' defaultValue='100' ref='chance'></input>
        <input type='submit' value='Kérés elküldése' disabled={!this.state.startsAt || !this.state.endsAt}></input>
      </form>
    </div>;
  }
});
