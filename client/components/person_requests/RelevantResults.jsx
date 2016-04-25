"use strict";

import React from 'react';
import RelevantItem from './RelevantItem.jsx';

export default React.createClass({
  render(){
    return <div>
      <h3>Beérkezett kérvények</h3>
      <table>
        <thead>
          <tr>
            <td>Dolgozó</td>
            <td>Kérvényező</td>
            <td>Munka</td>
            <td>Időtartam</td>
            <td>Állapot</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.props.relevant.map(request=>{
            return <RelevantItem
              collisions={this.props.collisions}
              key={`relevant-${request.id}`}
              request={request}
              user={this.props.profileUser}></RelevantItem>;
          })}
        </tbody>
      </table>
    </div>;
  }
});
