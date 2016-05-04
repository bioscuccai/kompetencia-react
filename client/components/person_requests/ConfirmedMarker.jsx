"use strict";

import React from 'react';

export default React.createClass({
  render(){
    let confirmedMarker;
    switch(this.props.request.confirmed){
      case true: {
        confirmedMarker=<i className='ion ion-checkmark confirmed-request'></i>;
        break;
      }
      case null: {
        confirmedMarker=<i className='icon ion-clock'></i>;
        break;
      }
      case false: {
        confirmedMarker=<i className='icon ion-close rejected-request'></i>;
        break;
      }
    }
    return confirmedMarker;
  }
});
