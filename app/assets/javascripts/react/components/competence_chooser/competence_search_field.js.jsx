"use strict";

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <input type="text" placeholder="Szűrés" onChange={this.handleSearchChange}/>
    </div>;
  },
  
  handleSearchChange(e){
    if(this.props.searchChanged){
      this.props.searchChanged(e.target.value);
    }
  }
});
