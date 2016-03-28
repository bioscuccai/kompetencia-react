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
          <a href="#" className="button"
            onClick={this.setLevel.bind(this, 1)}>junior</a>
          <a href="#" className="button"
            onClick={this.setLevel.bind(this, 2)}>senior</a>
          <a href="#" className="button"
            onClick={this.setLevel.bind(this, 3)}>1337</a>
        </div>
        <div className="column column-10">
          {removeButton}
        </div>
      </div>
    </div>;
  },
  
  setLevel(level, e){
    console.log("args");
    console.log(arguments);
    competenceActions.setLevel(this.props.competence.id, this.props.user.id, level);
  },
  
  removeAssigned(e){
    console.log(e);
    competenceActions.removeAssigned(this.props.competence.id, this.props.user.id);
  },
  
  removePending(e){
    console.log(e);
  }
});
