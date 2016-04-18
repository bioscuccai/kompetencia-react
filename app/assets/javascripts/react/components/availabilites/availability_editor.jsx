"use strict";

import React from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';

import availabilityActions from '../../actions/availability_actions';

export default React.createClass({
  getInitialState(){
    return {
      startsAt: null,
      endAt: null
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
        <DateTime value={this.props.availability.starts_at} timeFormat={false} closeOnSelect={true}></DateTime>
        Befejezés:
        <DateTime value={this.props.availability.ends_at}></DateTime>
        <textarea defaultValue={this.props.availability.comment} ref='comment'></textarea>
        <input type='submit' value='Mentés'></input>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    console.log("submit");
    availabilityActions.editAvailability(this.props.availability.user_id,
      this.props.availability.id,
      this.state.startsAt,
      this.state.endsAt,
      this.refs.comment.value);
    this.onClose();
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
  },
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
