'use strict';

import React from 'react';

export default React.createClass({
  render(){
    return <button className='icon-button icon-button-large close-button' onClick={this.onClose}>
      <i className='icon ion-close'></i>
    </button>;
  },
  
  onClose(){
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
