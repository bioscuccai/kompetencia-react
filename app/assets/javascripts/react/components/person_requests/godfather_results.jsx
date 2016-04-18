"use strict";

import React from 'react';
import GodfatherAvailabilityItem from './godfather_availability_item.jsx';

export default React.createClass({
  render(){
    return <div>
      <h3>Meghírdetett</h3>
      <table>
        <thead>
          <tr>
            <th>Dolgozó</th>
            <th>Kezdés</th>
            <th>Befejezés</th>
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
