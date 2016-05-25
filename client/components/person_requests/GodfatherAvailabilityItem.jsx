"use strict";

import React from 'react';

import DateLabel from '../date/DateLabel.jsx';
import AvailabilityButtons from '../availabilites/AvailabilityButtons.jsx';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    return <tr className={this.props.availability.active? "" : "inactive-availability"}>
      <td>
        <Link to={`/users/${this.props.availability.user.id}`}>
          {this.props.availability.user.name}
          <div><small>({this.props.availability.user.email})</small></div>
        </Link>
      </td>
      <td>
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
