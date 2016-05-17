"use strict";

import React from 'react';
import competenceTypeActions from '../../actions/competence_type_actions';
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    return <div>
      <h2>Új kompetencia kategória</h2>
      <form onSubmit={this.onFormSubmit}>
        <input type='text' ref='title' placeholder='Megnevezés'/>
        <select ref='tierGroup'>
          {this.props.competenceTierGroups.map(tierGroup=>{
            return <option value={tierGroup.id} key={`tier-group-select-${tierGroup.id}`}>{tierGroup.title}</option>;
          })}
        </select>
        <div>
          <small>
            <Link to='/competence_tier_groups'>
              Kérdés sablonok &raquo;
            </Link>
          </small>
        </div>
        <input type='submit' value='Új kompetencia kategória'/>
      </form>
      <button onClick={this.onCloseModal}>Bezár</button>
    </div>;
  },
  
  onFormSubmit(e){
    e.preventDefault();
    competenceTypeActions.createCompetenceType(this.refs.title.value, this.refs.tierGroup.value).then(data=>{
      NotificationManager.info("Kompetencia csoport létrehozva");
    });
    this.onCloseModal();
  },
  
  onCloseModal(){
    if(this.props.closeModal){
      this.props.closeModal();
    }
  }
});
