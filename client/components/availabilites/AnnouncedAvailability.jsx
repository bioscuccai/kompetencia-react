"use strict";

import React from 'react';
import UserBulletpoints from '../user/UserBulletpoints.jsx';
import DateLabel from '../date/DateLabel.jsx';

export default React.createClass({
  render(){
    return <div className='row'>
      <div className='column column-60'>
        
      </div>
      <div className='column column-40'>
        <DateLabel date={this.props.availability}></DateLabel>
      </div>
    </div>;
  }
});
