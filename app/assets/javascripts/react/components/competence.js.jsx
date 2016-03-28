window.Competence=React.createClass({
  render(){
    let removeButton=null;
    
    //torles gomb
    if(this.props.competence.isAssigned){
      removeButton=<a className='button' href="#" onClick={this.removeAssigned}>Töröl</a>;
    }
    if(this.props.competence.isPending){
      removeButton=<a href="#" className='button' onClick={this.removePending}>Visszautasít</a>;
    }
    
    let highlighClass="";
    //kiemeles
    if(this.props.competence.isAssigned){
      highlighClass='assigned-competence';
    }
    if(this.props.competence.isPending){
      highlighClass='pending-competence';
    }
    
    return <div className='container'>
      <div className={`row ${highlighClass}`}>
        <div className="column column-50">
          {this.props.competence.title} {this.props.competence.id} {this.props.competence.isAssigned} {this.props.isPending}
        </div>
        <div className="column column-40">
          {this.props.competence.tiers.map(tier=>{
            return <CompetenceTierButton key={`${this.props.competence.id}-${tier.level}`}
              competence={this.props.competence} tier={tier} user={this.props.user}></CompetenceTierButton>;
          })}
        </div>
        <div className="column column-10">
          {removeButton}
        </div>
      </div>
    </div>;
  },
  
  removeAssigned(e){
    console.log(e);
    competenceActions.removeAssigned(this.props.competence.id, this.props.user.id);
  },
  
  removePending(e){
    console.log(e);
  }
});
