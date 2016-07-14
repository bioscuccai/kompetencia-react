'use strict';

import React from 'react';
import CloseButton from './CloseButton.jsx';

export default React.createClass({
  render(){
    return <div className='clearfix modal-title'>
      <div className='float-left'>
        <h1>
          {this.props.title}
        </h1>
      </div>
      <div className='float-right'>
        <CloseButton onClose={this.props.onClose}></CloseButton>
      </div>
    </div>;
  },
  
  onClose(){
    if(this.props.onClose) this.props.onClose();
  }
});
