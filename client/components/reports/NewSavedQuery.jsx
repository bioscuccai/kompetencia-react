'use strict';

import React from 'react';
import reportActions from '../../actions/report_actions';
import {NotificationManager} from 'react-notifications';
import CloseButton from '../CloseButton.jsx';

export default React.createClass({
  render(){
    return <div>
      <div className='clearfix modal-title'>
        <div className='float-left'>
          <h1>
            Új mentett keresés
          </h1>
        </div>
        <div className='float-right'>
          <CloseButton onClose={this.onClose}></CloseButton>
        </div>
      </div>
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
      this.props.onlySubordinates,
      this.props.competences)
    .then(data=>{
      NotificationManager.info("Keresés elmentve");
      if(this.props.onClose){
        this.props.onClose();
      }
    });
  },
  
  onClose(){
    if(this.props.onClose) this.props.onClose();
  }
});
