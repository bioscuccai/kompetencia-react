window.CompetenceTierGroup=React.createClass({
  render(){
    let title;
    if(this.props.group.selected){
      title=<CompetenceTierGroupEditor group={this.props.group}></CompetenceTierGroupEditor>;
    } else {
      title=<h3 onClick={this.onClick}>{this.props.group.title}</h3>;
    }
    return <div>
      {title}
      <blockquote>
        <table>
          <thead>
            <tr>
              <th>
                Szint
              </th>
              <th>
                Megnevezés
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.group.tiers.map(tier=>{
              let label;
              if(tier.selected){
                label=<CompetenceTierEditor tier={tier}></CompetenceTierEditor>;
              } else {
                label=<CompetenceTierLabel tier={tier}></CompetenceTierLabel>;
              }
              return <tr key={tier.title}><td>{tier.level}</td><td>
                {label}
              </td></tr>;
            })}
          </tbody>
        </table>
        <NewCompetenceTier group={this.props.group}></NewCompetenceTier>
      </blockquote>
    </div>;
  },
  
  onClick(){
    competenceTierActions.selectTierGroup(this.props.group.id);
  }
});
