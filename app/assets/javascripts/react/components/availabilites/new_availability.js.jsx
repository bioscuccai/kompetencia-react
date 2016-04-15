"use strict";

import React from 'react';
import DateTime from 'react-datetime';

import availabilityActions from '../../actions/availability_actions.js.jsx';

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
        Kezdés:
        <DateTime onChange={this.onStartChange} timeFormat={false} closeOnSelect={true}></DateTime>
        Befejezés:
        <DateTime onChange={this.onEndChange} timeFormat={false} closeOnSelect={true}></DateTime>
        <textarea value={this.state.comment} onChange={this.onCommentChange}></textarea>
        <input type='submit' value="Új rendelkezésreállás"></input>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    availabilityActions.newAvailability(this.props.user.id, this.state.startsAt, this.state.endsAt, this.state.comment);
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
  },
  
  onCommentChange(e){
    this.setState({
      comment: e.value
    });
  }
});
