"use strict";

import React from 'react';
import _ from 'lodash';
import queryStore from '../../stores/query_store.js.jsx';
import DateTime from 'react-datetime';

import CompetenceQueryResult from './competence_query_result.js.jsx';
import QueryResult from './query_result.js.jsx';
import MiniSelectedCompetences from './mini_selected_competences.js.jsx';

export default React.createClass({
  getInitialState() {
    return {
      competences: [], //osszes kompetencia
      filteredCompetences: [], //szurt kompetenciak
      selectedCompetences: [], //kivalasztott kompetenciak
      results: [],
      startsAt: null,
      endsAt: null
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
    
    let filteredCompetenceGroups=_.groupBy(this.state.filteredCompetences, e=>e.type);
    let filteredCompetenceTypes=_.keys(filteredCompetenceGroups);
    return <div>
      <h1>Keresés</h1>
      <div>
        <h4>Dátum</h4>
        <div className='row'>
          <div className='column column-20'>
            Kezdés:
          </div>
          <div className='column column-80'>
            <DateTime timeFormat={false} onChange={this.onStartChange} closeOnSelect={true}></DateTime>
          </div>
        </div>
        <div className='row'>
          <div className='column column-20'>
            Befejezés:
          </div>
          <div className='column column-80'>
            <DateTime timeFormat={false} onChange={this.onEndChange} closeOnSelect={true}></DateTime>
          </div>
        </div>
      </div>
      <div>
        <h4>Kompetencia</h4>
        <input type='text' placeholder='Kompetencia szűrő' onChange={this.onFilterChange} ref='filter'></input>
        <MiniSelectedCompetences competences={this.state.selectedCompetences}></MiniSelectedCompetences>
        {
          filteredCompetenceTypes.map(type=>{
            return <div key={`query-competence-type-${type}`}>
              <h5>{type}</h5>
              {
                filteredCompetenceGroups[type].map(competence=>{
                  return <CompetenceQueryResult
                    competence={competence}
                    key={`competence-query-${competence.id}`}
                    handleCompetenceSelection={this.handleCompetenceSelection}></CompetenceQueryResult>;
                })
              }
            </div>;
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
                return <QueryResult
                  currentUser={this.props.currentUser}
                  result={result} 
                  key={`result-${result.id}`}></QueryResult>;
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
  
  onStartChange(md){
    this.setState({
      startsAt: md.toDate()
    });
  },
  
  onEndChange(md){
    this.setState({
      endsAt: md.toDate()
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
    queryStore.fetchQuery(requested, this.state.startsAt, this.state.endsAt);
    console.log(requested);
  }
});