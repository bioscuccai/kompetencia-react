window.NewCompetenceType=React.createClass({
  render(){
    return <div>
      <form onSubmit={this.onFormSubmit}>
        <input type='text' ref='title' placeholder='Megnevezés'/>
        <select ref='tierGroup'>
          {this.props.competenceTierGroups.map(tierGroup=>{
            return <option value={tierGroup.id}>{tierGroup.title}</option>;
          })}
        </select>
        <input type='submit' value='Új kompetencia kategória'/>
      </form>
    </div>;
  },
  
  onFormSubmit(e){
    e.preventDefault();
    competenceTypeActions.createCompetenceType(this.refs.title.value, this.refs.tierGroup.value);
  }
});
