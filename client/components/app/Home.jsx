"use strict";

import React from 'react';
import Recent from './Recent.jsx';
import auth from '../../lib/auth';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  render(){
    let main;
    if(auth.canSeeAvailabilities(this.context.currentUser)){
      main=<Recent></Recent>;
    } else {
      main=<div>
        <h1>SZTE SED RM</h1>
        Menü a bal oldalon.
      </div>;
    }
    return <div>{main}</div>;
  }
});
