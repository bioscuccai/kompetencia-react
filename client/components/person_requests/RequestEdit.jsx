"use strict";

import React from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';
require("moment/locale/hu");

import requestActions from '../../actions/request_actions';

export default React.createClass({
  getInitialState(){
    return {
      startsAt: (!this.props.request.starts_at) ? null : new Date(this.props.request.starts_at),
      endsAt: (!this.props.request.ends_at) ? null : new Date(this.props.request.ends_at)
    };
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
  
  render(){
    return <div>
      <form onSubmit={this.onSubmit}>
        <div className='row'>
          <div className='column column-50'>
            Kezdés:
          </div>
          <div className='column column-50'>
            Befejezés:
          </div>
        </div>
        <div className='row'>
          <div className='column column-50'>
            <DateTime
              timeFormat={false}
              defaultValue={this.state.startsAt}
              closeOnSelect={true}
              onChange={this.onStartChange}></DateTime>
          </div>
          <div className='column column-50'>
            <DateTime
              timeFormat={false}
              defaultValue={this.state.endsAt}
              closeOnSelect={true}
              onChange={this.onEndChange}></DateTime>
          </div>
        </div>
        
        <input type='text' ref='title' defaultValue={this.props.request.title}></input>
        <textarea ref='comment' defaultValue={this.props.request.comment}></textarea>
        <input type='text' ref='chance' defaultValue={this.props.request.chance || 100}></input>
        <input type='submit' value='Mentés'/>
        <button onClick={this.onClose}>Mégsem</button>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();

    requestActions.updateRequest(this.props.request.user_id, this.props.request.id, this.state.startsAt, this.state.endsAt,
      this.refs.chance.value, this.refs.title.value, this.refs.comment.value);
    
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
