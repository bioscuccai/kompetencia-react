"use strict";

import React from 'react';
import DateTime from 'react-datetime';
import {NotificationManager} from 'react-notifications';

import availabilityActions from '../../actions/availability_actions';

export default React.createClass({
  getInitialState(){
    return {
      startsAt: null,
      endsAt: null,
      comment: ""
    };
  },
  
  render(){
    return <div>
      <h3>Új rendelkezésre állás</h3>
      <form onSubmit={this.onSubmit}>
        <div>
          Kezdés:
          <DateTime onChange={this.onStartChange} timeFormat={false} closeOnSelect={true}></DateTime>
          Befejezés:
          <DateTime onChange={this.onEndChange} timeFormat={false} closeOnSelect={true}></DateTime>
        </div>
        <div>
          Munkaóra: <input type='text' placeholder='Munkaóra' ref='workHours'></input>
        </div>
        <div>
          <textarea ref='comment' placeholder='Komment'></textarea>
        </div>
        <div>
          <input type='submit' value="Új rendelkezésreállás" disabled={!this.state.startsAt || !this.state.endsAt}></input>
        </div>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    availabilityActions.newAvailability(this.props.user.id, this.state.startsAt, this.state.endsAt, this.refs.comment.value, this.refs.workHours.value)
    .then(data=>{
      NotificationManager.info("Rendelkezésreállás hozzáadva");
    });
    if(this.props.closeModal){
      this.props.closeModal();
    }
  },
  
  onStartChange(md){
    this.setState({
      startsAt: md.toDate()
    });
  },
  
  onEndChange(md){
    this.setState({
      endsAt: md.toDate()
    });
  }
});
