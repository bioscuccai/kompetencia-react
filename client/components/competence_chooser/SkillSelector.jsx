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
  
  render(){
    return <div>
      <div className='row'>
        <div className='column column-20'>
          Képesség:
        </div>
        
        <div className='column column-60'>
          <Typeahead
            ref='skillName'
            options={this.props.allSkills.map(e=>e.name)}
            onChange={this.onSkillChange}>
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
