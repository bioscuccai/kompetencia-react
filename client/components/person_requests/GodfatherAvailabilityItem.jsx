"use strict";

import React from 'react';

import DateLabel from '../date/DateLabel.jsx';
import AvailabilityButtons from '../availabilites/AvailabilityButtons.jsx';
import {Link} from 'react-router';
import classNames from 'classnames';
import moment from 'moment';

export default React.createClass({
  render(){
    let classes = classNames({
      'expired-availability': moment().isAfter(this.props.availability.ends_at),
      'inactive-availability': !this.props.availability.active
    });
    return <tr className={classes}>
      <td>
        <Link to={`/users/${this.props.availability.user.id}`}>
          {this.props.availability.user.name}
          <div><small>({this.props.availability.user.email})</small></div>
        </Link>
      </td>
      <td>
        <i className="icon ion-calendar"></i>&nbsp;
        <DateLabel date={this.props.availability.starts_at}></DateLabel>
        &mdash;
        <DateLabel date={this.props.availability.ends_at}></DateLabel>
      </td>
      <td>
        {this.props.availability.work_hours}
      </td>
      <td>
        {this.props.availability.comment}
      </td>
      <td>
        <AvailabilityButtons availability={this.props.availability}></AvailabilityButtons>
      </td>
    </tr>;
  }
});
