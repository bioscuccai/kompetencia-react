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
      selectedSavedQueryIds: [],
      unpublished: false,
      name: ""
    };
  },
  
  onUnpublishedChange(e){
    this.setState({unpublished: e.target.checked});
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
      <p>Megnevezés:</p>
      <input type='text' ref='name' placeholder='Megnevezés' value={this.state.name}
        onChange={e=>this.setState({name: e.target.value})}></input>
      <p>Hozzátartozó mentett keresések:</p>
      <select ref='savedQueries' multiple onChange={this.onSelectChange} className='tall-200px'>
        {this.props.savedQueries.map(sq=>{
          return <option key={sq.id} value={sq.id}>{sq.name}</option>;
        })}
      </select>
      <div>
        Csak én láthatom (WIP)
        <input type='checkbox' onChange={this.onUnpublishedChange} checked={this.state.unpublished}></input>
      </div>
      <button onClick={this.onHandleSave} disabled={this.state.selectedSavedQueryIds.length===0 || this.state.name.length===0}>Mentés</button>
    </div>;
  },
  
  onSelectChange(e){
    this.setState({selectedSavedQueryIds: [...e.target.options].filter(item=>item.selected).map(item=>parseInt(item.value))});
  },
  
  onHandleSave(){
    console.log(this.state.selectedSavedQueryIds);
    reportActions.createReport(this.state.name,
      this.state.unpublished,
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
