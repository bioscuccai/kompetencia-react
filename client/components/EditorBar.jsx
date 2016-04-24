"use strict";

import React from 'react';

export default React.createClass({
  onSave(){
    if (this.props.onSave) {
      this.props.onSave();
    }
  },
  
  onDelete(){
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  },
  
  render(){
    return <div className='row'>
      <div className='column column-80'>
        {this.props.children}
      </div>
      
      <div className='column column-20'>
        <button className='icon-button' onClick={this.onSave} title='Mentés'>
          <i className='icon ion-checkmark'></i>
        </button>
        
        <button className='icon-button' onClick={this.onDelete} title='Törlés'>
          <i className='icon ion-trash-a'></i>
        </button>
      </div>
    </div>;
  }
});
