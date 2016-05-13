"use strict";

import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import DateLabel from '../date/DateLabel.jsx';
import AvailabilityButtons from './AvailabilityButtons.jsx';

export default React.createClass({
  render(){
    let highlightClass;
    if(moment().isBetween(this.props.availability.starts_at, this.props.availability.ends_at)){
      highlightClass="current-date";
    }
    if(moment().isAfter(this.props.availability.ends_at)){
      highlightClass="expired-date";
    }
    return <tr className={`${highlightClass} ${this.props.availability.active ? "" : "inactive-availability"}`}>
      <td>
        <DateLabel date={this.props.availability.starts_at}></DateLabel>
      </td>
      <td>
        <DateLabel date={this.props.availability.ends_at}></DateLabel>
      </td>
      <td>
        <small className='comment-preview'>
          {this.props.availability.comment}
        </small>
      </td>
      <td>
        {this.props.availability.work_hours}
      </td>
      <td className='availability-buttons'>
        <AvailabilityButtons availability={this.props.availability}></AvailabilityButtons>
      </td>
    </tr>;
  }
});
