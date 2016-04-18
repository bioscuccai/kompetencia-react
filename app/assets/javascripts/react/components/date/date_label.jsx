"use strict";

import React from 'react';
import moment from 'moment';

export default React.createClass({
  render(){
    let date=moment(this.props.date);
    let formatted=date.format("YYYY. MMM. D.");
    return <span>{formatted}</span>;
  }
});
