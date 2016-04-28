"use strict";

import React from 'react';
import NotSubordinateItem from './NotSubordinateItem.jsx';

export default React.createClass({
  render(){
    return <div>
      <h2>Új Dolgozó</h2>
      <input type='text' ref='filter' placeholder='Szűrés' onChange={this.onFilterChange}></input>
      {this.props.notSubordinates.map(user=>{
        return <NotSubordinateItem
            key={`not-subordinate-${user.id}`}
            profileUser={this.props.profileUser}
            user={user}></NotSubordinateItem>;
      })
      }
    </div>;
  },
  
  onFilterChange(){
    
  }
});
