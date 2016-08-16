'use strict';

import React from 'react';
import reportActions from '../../actions/report_actions';
import {NotificationManager} from 'react-notifications';
import CloseButton from '../CloseButton.jsx';

export default React.createClass({
  getInitialState(){
    return {
      unpublished: false
    };
  },
  
  onUnpublishedChange(e){
    this.setState({
      unpublished: e.target.checked
    });
  },
  
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
      <div>
        Név:
        <input type='text' ref='name'></input>
      </div>
      <div>
        Csak én láthatom (WIP)
        <input type='checkbox' onChange={this.onUnpublishedChange} checked={this.state.unpublished}></input>
      </div>
      <button onClick={this.onSubmit}>Mentés</button>
    </div>;
  },
  
  onSubmit(){
    console.log(this.state);
    reportActions.createSavedQuery(this.refs.name.value,
      this.props.matchAll,
      this.props.showPending,
      this.props.onlySubordinates,
      this.state.unpublished,
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
