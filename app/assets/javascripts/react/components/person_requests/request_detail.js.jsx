"use strict";

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <h1>{this.props.request.title}</h1>
      <p>{this.props.request.comment}</p>
      <p>{this.props.request.starts_at}</p>
      <p>{this.props.request.ends_at}</p>
      <p>{this.props.request.target.email}</p>
      <p>{this.props.request.user.email}</p>
    </div>;
  }
});
