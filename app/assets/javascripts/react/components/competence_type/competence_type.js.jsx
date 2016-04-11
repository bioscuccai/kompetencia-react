import React from 'react';
import NewCompetence from './new_competence.js.jsx';
import CompetenceMember from './competence_member.js.jsx';

export default React.createClass({
  render(){
    return <div>
      <h5>{this.props.competenceType.title} ({_.get(this.props.competenceType, "competence_tier_group.title")})</h5>
      {this.props.competenceType.competences.map(competence=>{
        return <CompetenceMember competence={competence}
          key={`competence-${this.props.competenceType.id}-${competence.id}`}></CompetenceMember>;
      })}
      <blockquote>
        <NewCompetence competenceType={this.props.competenceType}></NewCompetence>
      </blockquote>
    </div>;
  }
});
