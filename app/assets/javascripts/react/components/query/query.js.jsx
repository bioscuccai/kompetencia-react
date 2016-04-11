import React from 'react';
import _ from 'lodash';
import queryStore from '../../stores/query_store.js.jsx';

import CompetenceQueryResult from './competence_query_result.js.jsx';
import QueryResult from './query_result.js.jsx';
import MiniSelectedCompetences from './mini_selected_competences.js.jsx';

export default React.createClass({
  getInitialState() {
    return {
      competences: [], //osszes kompetencia
      filteredCompetences: [], //szurt kompetenciak
      selectedCompetences: [], //kivalasztott kompetenciak
      results: []
    };
  },
  
  componentDidMount(){
    queryStore.listen(this.handleStoreChange);
    queryStore.fetchAllCompetences(); //a QueryStore is figyel erre, oda jut
  },
  
  componentWillUnmount() {
    queryStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    let resultGroups=_.groupBy(this.state.results, res=>res.found.length);
    let resultHitGroups=_.keys(resultGroups).reverse();
    return <div>
      <div>
        <h4>Dátum</h4>
        <input type='datetime' ref='startsAt' placeholder='Kezdet'></input>
        <input type='datetime' ref='endsAt' placeholder='Vég'></input>
      </div>
      <div>
        <h4>Kompetencia</h4>
        <input type='text' placeholder='Kompetencia szűrő' onChange={this.onFilterChange} ref='filter'></input>
        <MiniSelectedCompetences competences={this.state.selectedCompetences}></MiniSelectedCompetences>
        
        {
          this.state.filteredCompetences.map(competence=>{
            return <CompetenceQueryResult
              competence={competence}
              key={`competence-query-${competence.id}`}
              handleCompetenceSelection={this.handleCompetenceSelection}></CompetenceQueryResult>;
          })
        }
      </div>
      <div>
        <button onClick={this.onQuery}>Keresés</button>
      </div>
      <div>
        <h4>Találatok</h4>
        {resultHitGroups.map(rhg=>{
          return <div key={`hits-${rhg}`}>
            <h5>{rhg} Találat</h5>
              {resultGroups[rhg].map(result=>{
                return <QueryResult result={result} key={`result-${result.id}`}></QueryResult>;
              })}
          </div>;
        })}
      </div>
    </div>;
  },
  
  handleStoreChange(state){
    this.setState({
      competences: state.competenceQuery,
      selectedCompetences: state.competenceQuery.filter(e=>!_.isNil(e.selectedLevel)),
      filteredCompetences: this.filterResults(state.competenceQuery),
      results: state.results
    });
  },
  
  filterResults(query){
    return query.filter(q=>q.title.contains(this.refs.filter.value));
  },
  
  onFilterChange(){
    this.setState({
      filteredCompetences: this.filterResults(this.state.competences)
    });
  },
  
  onQuery(e){
    e.preventDefault();
    let requested=this.state.selectedCompetences.map(competence=>{
      return {
        competence_id: competence.id,
        level: competence.selectedLevel
      };
    });
    queryStore.fetchQuery(requested);
    console.log(requested);
  }
});
