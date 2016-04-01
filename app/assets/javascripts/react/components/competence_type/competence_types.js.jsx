window.CompetenceTypes=React.createClass({
  getInitialState(){
    return {
      competenceTypes: [],
      competenceTierGroups: []
    };
  },
  
  componentDidMount(){
    competenceTypeStore.listen(this.handleCompetenceTypeStoreChange);
    competenceTierStore.listen(this.handleCompetenceTierStoreChange);
    competenceTierStore.fetchCompetenceTiers();
    competenceTypeStore.fetchCompetenceTypes();
  },
  
  componentWillUnmount(){
    competenceTypeStore.unlisten(this.handleCompetenceTypeStoreChange);
    competenceTierStore.unlisten(this.handleCompetenceTierStoreChange);
  },
  
  render(){
    return <div>
      {this.state.competenceTypes.map(competenceType=>{
        return <CompetenceType competenceType={competenceType} key={`comp-type-${competenceType.id}`}></CompetenceType>;
      })}
      <NewCompetenceType competenceTierGroups={this.state.competenceTierGroups}></NewCompetenceType>
    </div>;
  },
  
  handleCompetenceTypeStoreChange(){
    this.setState({
      competenceTypes: competenceTypeStore.getState().competenceTypes
    });
  },
  
  handleCompetenceTierStoreChange(){
    this.setState({
      competenceTierGroups: competenceTierStore.getState().competenceTierGroups
    });
  }
});
