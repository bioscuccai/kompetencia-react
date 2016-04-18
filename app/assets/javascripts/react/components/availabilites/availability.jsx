"use strict";

import React from 'react';
import moment from 'moment';
import DateLabel from '../date/date_label.jsx';
import AvailabilityButtons from './availability_buttons.jsx';

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
      <td>
        <DateLabel date={this.props.availability.starts_at}></DateLabel>
      </td>
      <td>
        <DateLabel date={this.props.availability.ends_at}></DateLabel>
      </td>
      <td>
        <small>
          {this.props.availability.comment}
        </small>
      </td>
      <td>
        <AvailabilityButtons availability={this.props.availability}></AvailabilityButtons>
      </td>
    </tr>;
  }
});
