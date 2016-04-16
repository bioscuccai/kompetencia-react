"use strict";

import React from 'react';

import UserBulletPoints from '../subordinates/user_bulletpoints.js.jsx';
import DateTime from 'react-datetime';

import requestActions from '../../actions/request_actions';

export default React.createClass({
  getInitialState(){
    return {
      startsAt: null,
      endsAt: null
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
  
  onSubmit(e){
    e.preventDefault();
    requestActions.createRequest(this.props.currentUser.id, this.props.user.id,
      this.state.startsAt, this.state.endsAt,
      parseInt(this.refs.chance.value),
      this.refs.title.value, this.refs.comment.value);
  },
  
  render(){
    return <div>
      <div>
        <UserBulletPoints user={this.props.user}></UserBulletPoints>
      </div>
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
        <input type='submit' value='Kérés elküldése'></input>
      </form>
    </div>;
  }
});
