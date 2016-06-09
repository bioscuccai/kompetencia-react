"use strict";

import React from 'react';
import SkillMini from '../skill/SkillMini.jsx';

import _ from 'lodash';

import {Typeahead} from 'react-typeahead';
import {NotificationManager} from 'react-notifications';

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
    return o.toLowerCase().contains(i.toLowerCase());
  },
  
  render(){
    return <div>
      <div className='row'>
        <div className='column column-20'>
          Képesség:
        </div>
        
        <div className='column column-60'>
          <Typeahead
            placeholder='Skill'
            onChange={this.onSkillChange}
            onOptionSelected={this.onSkillSelected}
            ref='skillName'
            filterOption={this.fo}
            options={this.props.allSkills.map(e=>e.name)}>
          </Typeahead>
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
  
  onSkillChange(e){
    this.setState({
      currentSkill: e.target.value
    });
  },
  
  onAddSkill(){
    competenceActions.addSkill(this.props.profileUser.id, this.state.currentSkill)
    .then(data=>{
      NotificationManager.info("Képesség hozzáadva");
      this.refs.skillName.value='';
    });
  }
});
