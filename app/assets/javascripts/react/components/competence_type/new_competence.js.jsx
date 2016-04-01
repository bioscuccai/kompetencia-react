window.NewCompetence=React.createClass({
  render(){
    return <div>
      <form onSubmit={this.onFormSubmit}>
        <input type='text' placeholder='Kérdés' ref='title'></input>
        <input type='submit' value='Új kérdés'></input>
      </form>
    </div>;
  },
  
  onFormSubmit(e){
    e.preventDefault();
    competenceTypeActions.createCompetence(this.refs.title.value, this.props.competenceType.id);
  }
});
