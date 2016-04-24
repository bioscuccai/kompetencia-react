"use strict";

import React from 'react';

import DateLabel from '../date/DateLabel.jsx';

import requestActions from '../../actions/request_actions';

export default React.createClass({
  render(){
    return <div>
      <h1>Kérés elfogadása</h1>
      <div>
        A következő hírdetések érintettek:
        <ul>
          {this.props.collisions.map(coll=>{
            return <li key={`coll-${coll.id}`}>
              <DateLabel date={coll.starts_at}></DateLabel> &mdash; <DateLabel date={coll.ends_at}></DateLabel>
            </li>;
          })}
        </ul>
      </div>
      <div>
        <button onClick={this.onAccept} className='accept-background'>
          <i className='icon ion-checkmark'></i> Elfogadás + hírdetések kikapcsolása
        </button>
        <button onClick={this.onAcceptNoCollision} className='accept-background'>
          <i className='icon ion-checkmark'></i> Elfogadás + hírdetések kinthagyása
        </button>
        <button onClick={this.onReject} className='reject-background'>
          <i className=''></i>Elutasít
        </button>
        <button onClick={this.onClose}>
          <i className='icon ion-close'></i> Mégsem
        </button>
      </div>
    </div>;
  },
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  
  onAccept(){
    requestActions.acceptRequest(this.props.request.user_id, this.props.request.id, this.props.user.id);
    this.onClose();
  },
  
  onAcceptNoCollision(){
    requestActions.acceptRequestNoCollisions(this.props.request.user_id, this.props.request.id, this.props.user.id);
    this.onClose();
  },
  
  onReject(){
    requestActions.rejectRequest(this.props.request.user_id, this.props.request.id, this.props.user.id);
    this.onClose();
  }
});