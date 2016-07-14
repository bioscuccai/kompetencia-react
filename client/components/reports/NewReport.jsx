'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import reportActions from '../../actions/report_actions.js';
import CloseButton from '../CloseButton.jsx';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      selectedSavedQueryIds: []
    };
  },
  
  render(){
    return <div>
      <div className='clearfix modal-title'>
        <div className='float-left'>
          <h1>
            Új Report
          </h1>
        </div>
        <div className='float-right'>
          <CloseButton onClose={this.onClose}></CloseButton>
        </div>
      </div>
      Név:
      <input type='text' ref='name'></input>
      <select ref='savedQueries' multiple onChange={this.onSelectChange} className='tall-200px'>
        {this.props.savedQueries.map(sq=>{
          return <option key={sq.id} value={sq.id}>{sq.name}</option>;
        })}
      </select>
      <button onClick={this.onHandleSave}>Mentés</button>
    </div>;
  },
  
  onSelectChange(e){
    this.setState({selectedSavedQueryIds: [...e.target.options].filter(item=>item.selected).map(item=>parseInt(item.value))});
  },
  
  onHandleSave(){
    console.log(this.state.selectedSavedQueryIds);
    reportActions.createReport(this.refs.name.value,
    this.state.selectedSavedQueryIds)
    .then(data=>{
      if(_.get(data, "data.status")==='ok'){
        NotificationManager.info("Report létrehozva");
      } else {
        NotificationManager.info("Report létrehozása sikertelen");
      }
    })
    .catch(e=>{
      NotificationManager.error("Report létrehozása sikertelen");
    });
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  
  onClose(){
    if(this.props.onClose) this.props.onClose();
  }
});
