'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import reportActions from '../../actions/report_actions.js';
import _ from 'lodash';
import {NotificationManager} from 'react-notifications';
import CloseButton from '../CloseButton.jsx';

export default React.createClass({
  getInitialState(){
    return {
      selectedSavedQueryIds: [],
      unpublished: false
    };
  },
  
  onUnpublishedChange(e){
    this.setState({unpublished: e.target.value});
  },
  
  componentDidMount(){
    this.setState({
      selectedSavedQueryIds: this.props.report.saved_queries.map(item=>item.id),
      unpublished: this.props.report.unpublished
    });
  },
  
  render(){
    return <div>
      <div className='clearfix modal-title'>
        <div className='float-left'>
          <h1>Report módosítás</h1>
        </div>
        <div className="float-right">
          <CloseButton onClose={this.onClose}></CloseButton>
        </div>
      </div>
      Név:
      <input type='text' ref='name' defaultValue={this.props.report.name}></input>
      <select
        ref='savedQueries' multiple
        onChange={this.onSelectChange}
        value={this.state.selectedSavedQueryIds}
        className='tall-200px'>
        {this.props.savedQueries.map(sq=>{
          return <option key={sq.id} value={sq.id}>{sq.name}</option>;
        })}
      </select>
      <div>
        Csak én láthatom
        <input type='checkbox' onChange={this.onUnpublishedChange} checked={this.state.unpublished}></input>
      </div>
      <button onClick={this.onHandleSave}>Mentés</button>
    </div>;
  },
  
  onSelectChange(e){
    this.setState({selectedSavedQueryIds: [...e.target.options].filter(item=>item.selected).map(item=>parseInt(item.value))});
  },
  
  onHandleSave(){
    reportActions.updateReport(this.props.report.id, this.refs.name.value,
    this.state.selectedSavedQueryIds)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Report módosítva");
      } else{
        NotificationManager.error("Hiba a report módosítása közben");
      }
    })
    .catch(e=>{
      NotificationManager.error("Hiba a report módosítása közben");
    });
    if(this.props.onClose){
      this.props.onClose();
    }
  },
  
  onClose(){
    if(this.props.onClose) this.props.onClose();
  }
});
