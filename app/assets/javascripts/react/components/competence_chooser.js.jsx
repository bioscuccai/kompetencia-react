window.CompetenceChooser=React.createClass({
  parseCompetences(){
    let storeState=competenceStore.getState();
    return storeState.allCompetences.map(competence=>{
      let pending=_.find(storeState.pendingCompetences, ['id', competence.id]);
      let assigned=_.find(storeState.competences, ['id', competence.id]);
      return _.assign({}, competence, {
        isPending: !_.isUndefined(pending),
        isAssigned: !_.isUndefined(assigned),
        //a pending kerul elore arra az esetre ha felhasznalo modositani akarja a sajat kompetenciajat
        level: _.get(pending, 'level') || _.get(assigned, 'level')
      });
    });
  },
  
  filterCompetences(){
    
  },
  
  getInitialState(){
    return {
      parsedCompetences: [], //az osszes kompetencia, jelolve, hogy milyen allapotban all
      filteredCompetences: [] //a kereso altal szurve -> ezt hasznaljuk
    };
  },
  
  componentDidMount(){
    competenceStore.listen(this.onCompetenceStoreChange);
    competenceStore.fetchAllCompetences();
    competenceStore.fetchCompetences(this.props.user.id);
    competenceStore.fetchPendingCompetences(this.props.user.id);
  },
  
  componentWillUnmount(){
    competenceStore.unlisten(this.onCompetenceStoreChange);
  },
  
  onCompetenceStoreChange(){
    console.log("store changed");
    this.setState({
      parsedCompetences: this.parseCompetences()
    });
  },
  
  render(){
    let competenceGroups=_.groupBy(this.state.parsedCompetences, 'type');
    return <div>
      <div>
        Chooser
      </div>
      <CompetenceSearchField searchChanged={this.onSearchChanged}></CompetenceSearchField>
      <div>
        {
          _.keys(competenceGroups).map(groupName=>{
            return <div key={`competence-group-${groupName}`}>
              <h2>{groupName}</h2>
              {competenceGroups[groupName].map(competence=>{
                return <Competence competence={competence} user={this.props.user} key={competence.id}></Competence>;
              })}
            </div>;
          })
        }
      </div>
    </div>;
  },
  
  onSearchChanged(searchQuery){
    this.filterCompetences();
  }
});
