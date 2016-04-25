"use strict";

import React from 'react';

import requestActions from '../../actions/request_actions';

export default React.createClass({
  getInitalState(){
    return {
      startsAt: null,
      endsAt: null
    };
  },
  
  onStartChange(md){
    this.setState({
      startsAt: md.toDate()
    });
  },
  
  onEndChange(md){
    this.setState({
      endsAt: md.toDate()
    });
  },
  
  render(){
    return <div>
      <form onSubmit={this.onSubmit}>
        
        <input type='text' ref='title'></input>
        <textarea ref='comment'></textarea>
        <input type='submit' value='Mentés'/>
        <button onClick={this.onClose}>Mégsem</button>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
