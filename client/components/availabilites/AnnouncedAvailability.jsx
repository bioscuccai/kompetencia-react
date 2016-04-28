"use strict";

import React from 'react';
import UserBulletpoints from '../user/UserBulletpoints.jsx';
import DateLabel from '../date/DateLabel.jsx';

export default React.createClass({
  render(){
    return <div className='row profile-item'>
      <div className='column column-60'>
        <UserBulletpoints user={this.props.availability.user}></UserBulletpoints>
      </div>
      <div className='column column-40'>
        <div>
          <small>
            <i className='icon ion-calendar'></i> <DateLabel date={this.props.availability.starts_at}></DateLabel> &mdash; <DateLabel date={this.props.availability.ends_at}></DateLabel>
          </small>
        </div>
        <div className='comment-preview'>
          {this.props.availability.comment}
        </div>
        
      </div>
    </div>;
  }
});
