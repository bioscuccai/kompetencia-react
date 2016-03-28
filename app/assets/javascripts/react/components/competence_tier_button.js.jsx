window.CompetenceTierButton=React.createClass({
  render(){
    let buttonClass='';
    if(this.props.competence.level==this.props.tier.level){
      buttonClass='selected-tier';
    }
    return <a href='#' className={`button ${buttonClass}`}
      onClick={this.setLevel}>
      {this.props.tier.title}
    </a>;
  },
  
  setLevel(e){
    console.log("args");
    console.log(arguments);
    e.preventDefault();
    competenceActions.setLevel(this.props.competence.id, this.props.user.id, this.props.tier.level);
  }
});
