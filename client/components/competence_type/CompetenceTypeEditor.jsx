"use strict";

import React from 'react';
import competenceTypeActions from '../../actions/competence_type_actions';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

import EditorBar from '../EditorBar.jsx';

export default React.createClass({
  render(){
    return <EditorBar onSave={this.onSave} onDelete={this.onDelete}>
      <div className='row'>
        <div className='column column-60'>
          <select ref='competenceTierGroupId'
            defaultValue={this.props.competenceType.competence_tier_group.id}>
            {this.props.competenceTierGroups.map(e=>{
              return <option value={e.id}>{e.title}</option>;
            })}
          </select>
        </div>
        <div className='column column-20'>
          <input type='number' ref='priority' defaultValue={this.props.competenceType.priority}></input>
        </div>
        <div className='column column-20'>
          Cím
          <input type='checkbox' ref='showTitle' defaultChecked={this.props.competenceType.show_title}></input>
        </div>
      </div>
      <div>
        <input type='text' ref='title' defaultValue={this.props.competenceType.title}></input>
      </div>
      <div>
        <input type='text' ref='description' defaultValue={this.props.competenceType.description}></input>
      </div>
    </EditorBar>;
  },
  
  onSave(){
    console.log(this.refs.title.value);
    competenceTypeActions.updateCompetenceType(this.props.competenceType.id, this.refs.title.value,
      this.refs.competenceTierGroupId.value,
      parseInt(this.refs.priority.value), this.refs.showTitle.checked,
      this.refs.description.value)
      .then(data=>{
        if(_.get(data, "data.status")==="ok"){
          NotificationManager.info("Siker");
        } else {
          NotificationManager.error("Hiba");
        }
      });
  },
  
  onDelete(){
    competenceTypeActions.deleteCompetenceType(this.props.competenceType.id).then(data=>{
      NotificationManager.info("Kompetencia típus törölve");
    });
  }
});
