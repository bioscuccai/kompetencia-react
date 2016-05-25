"use strict";

import React from 'react';
import _ from 'lodash';
import competenceTierActions from '../../actions/competence_tier_actions';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  render(){
    return <div>
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <input type='text' ref='title' placeholder='Megnevezés'></input>
        </div>
        <div>
          <input type='text' ref='description' placeholder='Leírás'></input>
        </div>
        <div>
          <input type='submit' value='Új kategória'></input>
        </div>
      </form>
    </div>;
  },
  
  handleFormSubmit(e){
    e.preventDefault();
    competenceTierActions.createCompetenceTier(
      this.refs.title.value,
      this.refs.description.value,
      this.props.group.id
    )
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Válasz létrehozva");
      } else {
        NotificationManager.error("Hiba");
      }
    });
    this.refs.title.value="";
    this.refs.description.value="";
  }
});
