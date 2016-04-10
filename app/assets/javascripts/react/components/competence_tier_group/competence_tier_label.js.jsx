window.CompetenceTierLabel=React.createClass({
  render(){
    return <div onClick={this.onClick}>
      {this.props.tier.title}
    </div>;
  },
  
  onClick(){
    competenceTierActions.selectTier(this.props.tier.id);
  }
});
