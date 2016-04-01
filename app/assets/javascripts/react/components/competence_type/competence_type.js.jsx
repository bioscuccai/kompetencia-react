window.CompetenceType=React.createClass({
  
  render(){
    return <div>
      <h4>{this.props.competenceType.title} ({_.get(this.props.competenceType, "competence_tier_group.title")})</h4>
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
