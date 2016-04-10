window.CompetenceTierGroups=React.createClass({
  getInitialState(){
    return {
      competenceTierGroups: []
    };
  },
  
  componentDidMount(){
    competenceTierStore.listen(this.handleStoreChange);
    competenceTierStore.fetchCompetenceTiers();
  },
  
  componentWillUnmount(){
    competenceTierStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    return <div>
      <h1>Válasz sablonok</h1>
      {this.state.competenceTierGroups.map(group=>{
        return <CompetenceTierGroup group={group} key={group.id}></CompetenceTierGroup>;
      })}
      <NewCompetenceTierGroup></NewCompetenceTierGroup>
    </div>;
  },
  
  handleStoreChange(){
    this.setState({
      competenceTierGroups: competenceTierStore.getState().competenceTierGroups
    });
  }
});
