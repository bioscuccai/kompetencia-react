"use strict";

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <h3>
        {this.props.email.godfather_name}
      </h3>
      <div>
        Dolgozók:
        <ul>
          {this.props.email.pending_subordinates.map(subordinate=>{
            return <li key={`sub-${this.props.email.godfather_name}-${subordinate}`}>{subordinate}</li>;
          })}
        </ul>
      </div>
      <div>
        Frissült hirdetések:
        <ul>
          {this.props.email.updated_requests.map(req=>{
            return <li key={`updreq-${this.props.email.godfather_name}-${req}`}>{req}</li>;
          })}
        </ul>
      </div>
      <div>
        Új hirdetések:
        <ul>
          {this.props.email.new_requests.map(req=>{
            return <li key={`newreq-${this.props.email.godfather_name}-${req}`}>{req}</li>;
          })}
        </ul>
      </div>
    </div>;
  }
});
