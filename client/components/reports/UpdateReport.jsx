'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import reportActions from '../../actions/report_actions.js';
import _ from 'lodash';
import {NotificationManager} from 'react-notifications';

export default React.createClass({
  getInitialState(){
    return {
      selectedSavedQueryIds: []
    };
  },
  
  componentDidMount(){
    this.setState({
      selectedSavedQueryIds: this.props.report.saved_queries.map(item=>item.id)
    });
  },
  
  render(){
    return <div>
      Név:
      <input type='text' ref='name'></input>
      <select
        ref='savedQueries' multiple
        onChange={this.onSelectChange}
        value={this.state.selectedSavedQueryIds}
        className='tall-200px'>
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
  }
});
