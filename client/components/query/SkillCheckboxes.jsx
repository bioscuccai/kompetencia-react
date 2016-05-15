"use strict";

import React from 'react';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      selectedSkillIds: []
    };
  },
  
  render(){
    return <div>
      {this.props.allSkills.map(skill=>{
        return <span key={`skill-${skill.name}`}>
          <input type='checkbox' value={skill.id} onChange={this.onChange}/> {skill.name}
        </span>;
      })}
    </div>;
  },
  
  onChange(e){
    if(e.checked){
      console.log("checked");
    }
    if(this.props.onChange){
      this.props.onChange();
    }
  }
});
