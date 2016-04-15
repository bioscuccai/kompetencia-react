"use strict";

import React from 'react';
import moment from 'moment';

export default React.createClass({
  render(){
    let highlightClass;
    if(moment().isBetween(this.props.availability.starts_at, this.props.availability.ends_at)){
      highlightClass="current-date";
    }
    if(moment().isAfter(this.props.availability.ends_at)){
      highlightClass="expired-date";
    }
    return <tr className={highlightClass}>
      <td>{this.props.availability.starts_at}</td>
      <td>{this.props.availability.ends_at}</td>
      <td>{this.props.availability.comment}</td>
    </tr>;
  }
});
