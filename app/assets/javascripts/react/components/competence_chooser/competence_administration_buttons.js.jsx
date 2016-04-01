window.CompetenceAdministrationButtons=React.createClass({
  render(){
    let removeButton=null;
    let pendingButton=null;
    if(this.props.competence.isAssigned){
      removeButton=<a className='button' href="#" onClick={this.removeAssigned}>Töröl</a>;
    }
    if(this.props.competence.isPending && this.props.directlyEdit){
      pendingButton=<div>
        <a href="#" className='button' onClick={this.rejectPending}>Visszautasít</a>
        <a href="#" className='button' onClick={this.acceptPending}>Elfogad</a>
      </div>;
    }
    return <div>
      {removeButton}
      {pendingButton}
    </div>;
  },
  
  removeAssigned(e){
    e.preventDefault();
    competenceActions.removeAssigned(this.props.competence.id, this.props.user.id);
  },
  
  rejectPending(e){
    e.preventDefault();
    competenceActions.rejectPending(this.props.competence.id, this.props.user.id);
  },
  
  acceptPending(e){
    e.preventDefault();
    competenceActions.acceptPending(this.props.competence.id, this.props.user.id);
  }
});
