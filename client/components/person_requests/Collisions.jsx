"use strict";

import React from 'react';

import DateLabel from '../date/DateLabel.jsx';

import requestActions from '../../actions/request_actions';
import {NotificationManager} from 'react-notifications';
import requestStore from '../../stores/request_store';
import ModalTitle from '../ModalTitle.jsx';

export default React.createClass({
  render(){
    return <div>
      <ModalTitle title='Kérés elfogadás' onClose={this.onClose}></ModalTitle>
      <div>
        A következő {this.props.collisions.length} hirdetés érintett:
        <ul>
          {this.props.collisions.map(coll=>{
            return <li key={`coll-${coll.id}`}>
              <i className='icon ion-calendar'></i><DateLabel date={coll.starts_at}></DateLabel> &mdash; <DateLabel date={coll.ends_at}></DateLabel>
            </li>;
          })}
        </ul>
      </div>
      <div>
        <div>
          <button onClick={this.onAccept} className='accept-background'>
            <i className='icon ion-checkmark'></i> Elfogadás + hírdetések kikapcsolása
          </button>
          <button onClick={this.onAcceptNoCollision} className='accept-background'>
            <i className='icon ion-checkmark'></i> Elfogadás + hírdetések kinthagyása
        </button>
        </div>
        <div>
          <button onClick={this.onReject} className='reject-background'>
            <i className=''></i>Elutasít
          </button>
        </div>
      </div>
    </div>;
  },
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  
  onAccept(){
    requestActions.acceptRequest(this.props.request.user_id, this.props.request.id, this.props.user.id)
    .then(data=>{
      NotificationManager.info("Felkérés elfogadva");
    });
    this.onClose();
  },
  
  onAcceptNoCollision(){
    requestActions.acceptRequestNoCollisions(this.props.request.user_id, this.props.request.id, this.props.user.id)
    .then(data=>{
      NotificationManager.info("Felkérés elfogadva");
    });
    this.onClose();
  },
  
  onReject(){
    requestActions.rejectRequest(this.props.request.user_id, this.props.request.id, this.props.user.id)
    .then(data=>{
      NotificationManager.info("Felkérés visszautasítva");
    });
    this.onClose();
  }
});
