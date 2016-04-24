"use strict";

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  render(){
    return <div>
      <h5>{this.context.currentUser.email}</h5>
      <div><Link to={`users/${this.context.currentUser.id}`}>Profilom</Link></div>
    </div>;
  }
});
