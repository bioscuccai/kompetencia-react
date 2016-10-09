"use strict";

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import DateLabel from '../date/DateLabel.jsx';
import AvailabilityButtons from './AvailabilityButtons.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  
  render(){
    let highlightClass;
    let buttons;
    if(this.props.hideButtons){
      buttons=<span></span>;
    } else {
      buttons=<AvailabilityButtons availability={this.props.availability}></AvailabilityButtons>;
    }
    let classes = classNames({
      'expired-availability': moment().isAfter(this.props.availability.ends_at),
      'inactive-availability': this.props.availability.active,
      'current-date': moment().isBetween(this.props.availability.starts_at, this.props.availability.ends_at)
    });
    return <tr className={classes}>
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
      <td>
        {this.props.availability.chance} %
      </td>
      <td className='availability-buttons'>
        {buttons}
      </td>
    </tr>;
  }
});
