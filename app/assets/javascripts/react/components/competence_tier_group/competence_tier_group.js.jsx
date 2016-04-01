window.CompetenceTierGroup=React.createClass({
  render(){
    return <blockquote>
      <h3>{this.props.group.title}</h3>
      <ul>
        {this.props.group.tiers.map(tier=>{
          return <li key={tier.title}>{tier.title} ({tier.level})</li>;
        })}
      </ul>
      <NewCompetenceTier group={this.props.group}></NewCompetenceTier>
    </blockquote>;
  }
});
