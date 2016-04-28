"use strict";

import React from 'react';
import GodfatherAvailabilityItem from './GodfatherAvailabilityItem.jsx';

export default React.createClass({
  render(){
    return <div>
      <h3>Meghírdetett</h3>
      <table>
        <thead>
          <tr>
            <th>Dolgozó</th>
            <th>Időtartam</th>
            <th>Komment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.godfatherAvailabilities.map(availability=>{
            return <GodfatherAvailabilityItem
              user={this.props.user}
              key={`godfather-availability-${availability.id}`}
              availability={availability}></GodfatherAvailabilityItem>;
          })}
        </tbody>
      </table>
    </div>;
  }
});
