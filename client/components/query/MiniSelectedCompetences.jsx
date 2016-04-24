"use strict";

import React from 'react';
import MiniSelectedCompetence from './MiniSelectedCompetence.jsx';

export default React.createClass({
  render() {
    return <div>
      Kiválaszott komepetenciák:
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
