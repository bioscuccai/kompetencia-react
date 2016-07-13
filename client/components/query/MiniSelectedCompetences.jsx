"use strict";

import React from 'react';
import MiniSelectedCompetence from './MiniSelectedCompetence.jsx';

export default React.createClass({
  render() {
    let title;
    if(this.props.competences.length!==0){
      title='Kiválasztva: ';
    }
    return <div>
      {title}
      {
        this.props.competences.map(competence=>{
          return <MiniSelectedCompetence
            key={`mini-competence-${competence.id}`}
            competence={competence}></MiniSelectedCompetence>;
        })
      }
    </div>;
  }
});
