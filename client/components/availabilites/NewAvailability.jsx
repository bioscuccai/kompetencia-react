"use strict";

import React from 'react';
import DateTime from 'react-datetime';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

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
    let userListWidget;
    if(_.isArray(this.props.userList)){
      console.log(this.props.userList);
      userListWidget=<div>
        Dolgozó:
        <select ref='userList'>
          {this.props.userList.map(u=>{
            return <option value={u.id} key={`user-list-av-${u.id}`}>{u.name}</option>;
          })}
        </select> 
      </div>;
    }
    
    return <div>
      <h3>Új rendelkezésre állás</h3>
      <form onSubmit={this.onSubmit}>
        {userListWidget}
        <div>
          Kezdés:
          <DateTime onChange={this.onStartChange} timeFormat={false} closeOnSelect={true}></DateTime>
          Befejezés:
          <DateTime onChange={this.onEndChange} timeFormat={false} closeOnSelect={true}></DateTime>
        </div>
        <div>
          Munkaóra: <input type='number' placeholder='Munkaóra' ref='workHours'></input>
        </div>
        <div>
          Valószínűség: <input type='number' placeholder='Esély' defaultValue='100' ref='chance'></input>
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
    let userId=_.get(this.props, "user.id");
    if(_.isArray(this.props.userList)){
      userId=this.refs.userList.value;
    }
    availabilityActions.newAvailability(userId,
      this.state.startsAt, this.state.endsAt,
      this.refs.comment.value, this.refs.workHours.value, this.refs.chance.value
    )
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Rendelekezésreállás létrehozva");
      } else {
        NotificationManager.error("Hiba");
      }
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
