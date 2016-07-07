'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import reportActions from '../../actions/report_actions.js';

export default React.createClass({
  getInitialState(){
    return {
      selectedSavedQueryIds: []
    };
  },
  
  render(){
    return <div>
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
    this.state.selectedSavedQueryIds);
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
