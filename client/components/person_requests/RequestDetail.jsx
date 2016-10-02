"use strict";

import React from 'react';
import DateLabel from '../date/DateLabel.jsx';
import UserBulletpoints from '../user/UserBulletpoints.jsx';
import ModalTitle from '../ModalTitle.jsx';

export default React.createClass({
  render(){
    return <div>
      <ModalTitle title={this.props.request.title} onClose={this.onClose}></ModalTitle>
      <p className='comment'>{this.props.request.comment}</p>
      <div className='row'>
        <div className='column column-20'>
          Időtartam
        </div>
        <div className='column column-80'>
          <i className='icon ion-calendar'></i>&nbsp;
          <DateLabel date={this.props.request.starts_at}></DateLabel>
          &mdash;
          <DateLabel date={this.props.request.ends_at}></DateLabel>
        </div>
      </div>
      
      <div className='row'>
        <div className='column column-20'>
          Kérvényező
        </div>
        <div className='column column-80'>
          <UserBulletpoints user={this.props.request.user}></UserBulletpoints>
        </div>
      </div>
      
      <div className='row'>
        <div className='column column-20'>
          Dolgozó
        </div>
        <div className='column column-80'>
          <UserBulletpoints user={this.props.request.target}></UserBulletpoints>
        </div>
      </div>
    </div>;
  },

  onClose(){
    if(this.props.onClose) this.props.onClose();
  }
});
