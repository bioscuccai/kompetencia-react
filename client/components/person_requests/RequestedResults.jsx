"use strict";

import React from 'react';
import RequestItem from './RequestItem.jsx';

export default React.createClass({
  render(){
    return <div>
      <h3>Kérvényezett</h3>
      <table>
        <thead>
          <tr>
            <td>Dolgozó</td>
            <td>Munka</td>
            <td>Időtartam</td>
            <td>Állapot</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.props.requested.map(req=>{
            return <RequestItem
              user={this.props.user}
              key={`request-${req.id}`}
              request={req}></RequestItem>;
          })}
        </tbody>
      </table>
    </div>;
  }
});
