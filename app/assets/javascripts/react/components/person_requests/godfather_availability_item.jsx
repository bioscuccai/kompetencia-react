"use strict";

import React from 'react';

import DateLabel from '../date/date_label.jsx';
import AvailabilityButtons from '../availabilites/availability_buttons.jsx';

export default React.createClass({
  render(){
    return <tr>
      <td>
        <a href={`/users/${this.props.availability.user.id}`}>
          {this.props.availability.user.email}
        </a>
      </td>
      <td>
        <DateLabel date={this.props.availability.starts_at}></DateLabel>
      </td>
      <td>
        <DateLabel date={this.props.availability.ends_at}></DateLabel>
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
