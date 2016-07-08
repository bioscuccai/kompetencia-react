'use strict';

import React from 'react';
import reportActions from '../../actions/report_actions';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  render(){
    return <div>
      Név:
      <input type='text' ref='name'></input>
      <button onClick={this.onSubmit}>Mentés</button>
    </div>;
  },
  
  onSubmit(){
    console.log(this.props.competences);
    reportActions.createSavedQuery(this.refs.name.value,
      this.props.matchAll,
      this.props.showPending,
      this.props.competences)
    .then(data=>{
      NotificationManager.info("Keresés elmentve");
      if(this.props.onClose){
        this.props.onClose();
      }
    });
  }
});
