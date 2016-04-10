window.CompetenceQuery=React.createClass({
  render() {
    return <div className='row'>
      <div className='column column-50'>
        {this.props.competence.title}
      </div>
      <div>
        {this.props.competence.tiers.map(tier=>{
          return <button key={`tier-button-${this.props.competence.id}-${tier.level}`}
              className={this.props.competence.selectedLevel==tier.level ? 'selected-tier' : ''}
              onClick={this.onLevelClick.bind(this, tier.level)}>
            {tier.title}
          </button>;
        })}
      </div>
      
    </div>;
  },
  
  onLevelClick(level, e){
    e.preventDefault();
    queryActions.setCompetenceLevel(this.props.competence.id, level, this.props.competence.selectedLevel!==level);
  }
});
