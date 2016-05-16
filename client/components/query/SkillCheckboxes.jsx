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
      <h2>Skillek</h2>
      {this.props.allSkills.map(skill=>{
        return <span className='skill-mini' key={`skill-${skill.name}`}>
          <input type='checkbox' value={skill.id} onChange={this.onChange}/> {skill.name}
        </span>;
      })}
    </div>;
  },
  
  onChange(e){
    let selectedIds=this.state.selectedSkillIds;
    if(e.target.checked){
      selectedIds=_(selectedIds).concat([parseInt(e.target.value)]).uniq().value();
    } else {
      selectedIds=selectedIds.filter(item=>item!=parseInt(e.target.value));
    }
    this.setState({
      selectedSkillIds: selectedIds 
    });
        
    if(this.props.onChange){
      this.props.onChange(selectedIds);
    }
  }
});
