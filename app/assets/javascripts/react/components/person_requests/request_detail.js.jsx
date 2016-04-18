"use strict";

import React from 'react';
import DateLabel from '../date/date_label.jsx';

export default React.createClass({
  render(){
    return <div>
      <h1>{this.props.request.title}</h1>
      <div>{this.props.request.comment}</div>
      <div>
        <i className='icon ion-calendar'></i>&nbsp;
        <DateLabel date={this.props.request.starts_at}></DateLabel>
        &mdash;
        <DateLabel date={this.props.request.ends_at}></DateLabel>
      </div>
      <div>
        <i className='icon ion-person'></i>&nbsp;
        {this.props.request.target.email}
      </div>
      <div>
        <img src='/godfather.gif' className='godfather-icon'></img>
        {this.props.request.user.email}
      </div>
    </div>;
  }
});
