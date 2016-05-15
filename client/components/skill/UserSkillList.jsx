"use strict";

import React from 'react';

import SkillMini from './SkillMini.jsx';

import auth from '../../lib/auth';

export default React.createClass({
  render(){
    let confirmButton;
    
    return <div>
      {this.props.skills.map(skill=>{
        return <SkillMini skill={skill} key={`skill-mini-${skill.name}`}
          profileUser={this.props.profileUser}
          currentUser={this.props.currentUser}></SkillMini>;
      })}
    </div>;
  }
});
