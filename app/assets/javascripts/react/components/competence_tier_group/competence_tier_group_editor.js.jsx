window.CompetenceTierGroupEditor=React.createClass({
  render(){
    return <div>
      <input ref='title' type='text' defaultValue={this.props.group.title}></input>
      <button onClick={this.onSave}>Mentés</button>
      <button onClick={this.onDelete}>Törlés</button>
    </div>;
  },
  
  onSave(e){
    e.preventDefault();
    competenceTierActions.updateTierGroup(this.props.group.id, this.refs.title.value);
  },
  
  onDelete(e){
    e.preventDefault();
    competenceTierActions.deleteTierGroup(this.props.group.id);
  }
});
