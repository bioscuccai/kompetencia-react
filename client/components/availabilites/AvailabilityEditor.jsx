"use strict";

import React from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';
require("moment/locale/hu");
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

import availabilityActions from '../../actions/availability_actions';

export default React.createClass({
  getInitialState(){
    return {
      startsAt: (!this.props.availability.starts_at) ? null : new Date(this.props.availability.starts_at),
      endAt: (!this.props.availability.ends_at) ? null : new Date(this.props.availability.ends_at)
    };
  },
  
  componentDidMount(){
    this.setState({
      startsAt: moment(this.props.availability.starts_at).toDate(),
      endsAt: moment(this.props.availability.ends_at).toDate(),
    });
  },
  
  render(){
    return <div>
      <form onSubmit={this.onSubmit}>
        Kezdés:
        <DateTime defaultValue={new Date(this.props.availability.starts_at)}
          timeFormat={false}
          closeOnSelect={true}
          onChange={this.onStartChange}></DateTime>
        Befejezés:
        <DateTime defaultValue={new Date(this.props.availability.ends_at)}
          timeFormat={false}
          closeOnSelect={true}
          onChange={this.onEndChange}></DateTime>
        <div>
          Munkóra:
          <input type='number' defaultValue={this.props.availability.work_hours} ref='workHours'></input>
        </div>
        <textarea defaultValue={this.props.availability.comment} ref='comment'></textarea>
        <input type='submit' value='Mentés'></input>
        <button onClick={this.onClose}>Bezár</button>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    availabilityActions.editAvailability(this.props.availability.user_id,
      this.props.availability.id,
      this.state.startsAt,
      this.state.endsAt,
      this.refs.comment.value,
      this.refs.workHours.value)
      .then(data=>{
        if(_.get(data, "data.status")==="ok"){
          NotificationManager.info("Rendelkezésreállás módosítva");
        } else {
          NotificationManager.error("Hiba");
        }
      });
    this.onClose();
  },
  
  onStartChange(md){
    console.log("start change");
    this.setState({
      startsAt: md.toDate()
    });
  },
  
  onEndChange(md){
    console.log("end change");
    this.setState({
      endsAt: md.toDate()
    });
  },
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
