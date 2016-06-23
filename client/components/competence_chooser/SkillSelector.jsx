"use strict";

import React from 'react';
import SkillMini from '../skill/SkillMini.jsx';

import _ from 'lodash';

import {NotificationManager} from 'react-notifications';
import Autocomplete from '../autocomplete/Autocomplete.jsx';

import competenceActions from '../../actions/competence_actions';

export default React.createClass({
  getInitialState(){
    return {
      currentSkill: ""
    };
  },
  
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.allSkills, this.props.allSkills) || this.state.currentSkill.length!==nextState.currentSkill.length;
  },
  
  fo(i, o){
    return o.toLowerCase().includes(i.toLowerCase());
  },
  
  render(){
    return <div>
      <div className='row'>
        <div className='column column-20'>
          Képesség:
        </div>
        
        <div className='column column-60'>
          <Autocomplete ref='ac' inputs={this.props.allSkills.map(e=>e.name)} onChange={this.onSkillSelected}>
          </Autocomplete>
        </div>
        
        <div className='column column-20'>
          <button className='icon-button icon-button-large'
            onClick={this.onAddSkill}
            disabled={this.state.currentSkill.length===0}>
            <i className='icon ion-plus'></i>
          </button>
        </div>
      </div>
    </div>;
  },
  
  onSkillSelected(e){
    this.setState({
      currentSkill: e
    });
  },
  
  onAddSkill(){
    if(this.state.currentSkill.length===0){
      return;
    }
    if(this.state.currentSkill.includes("<script")){
      window.location='/Dynomite.JPG';
      return;
    }
    competenceActions.addSkill(this.props.profileUser.id, this.state.currentSkill)
    .then(data=>{
      NotificationManager.info("Képesség hozzáadva");
      this.refs.ac.clear();
    });
  }
});
