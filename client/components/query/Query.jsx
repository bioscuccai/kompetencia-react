"use strict";

import React from 'react';
import _ from 'lodash';

import alt from '../../alt/alt';

import queryStore from '../../stores/query_store';
import DateTime from 'react-datetime';

import CompetenceQueryResult from './CompetenceQueryResult.jsx';
import QueryResult from './QueryResult.jsx';
import MiniSelectedCompetences from './MiniSelectedCompetences.jsx';

import {Tabs, Tab, TabList, TabPanel} from 'react-tabs';

import moment from 'moment';
require("moment/locale/hu");

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  getInitialState() {
    return {
      competences: [], //osszes kompetencia
      filteredCompetences: [], //szurt kompetenciak
      selectedCompetences: [], //kivalasztott kompetenciak
      results: [],
      startsAt: null,
      endsAt: null,
      selectedTabIndex: 0,
      dateChecked: false,
      notStrict: false
    };
  },
  
  componentDidMount(){
    alt.recycle(queryStore);
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
              <div className='column column-10'>
                <input type='checkbox' name='check_date' id='check_date' ref='checkDate' value="1" onChange={this.onDateClick}></input>
              </div>
              <div className='column column-40'>
                Dátumra keresés?
              </div>
              <div>
                <input type='checkbox' name='not_strict_search' id='not_strict_search' ref='notStrictSearch' value="1"></input>
              </div>
              <div>
                Részleges szűrés?
              </div>
            </div>
            <div className='row'>
              <div className='column column-50'>
                Kezdés:
              </div>
              <div className='column column-50'>
                Befejezés:
              </div>
            </div>
            <div className='row'>
              <div className='column column-50'>
                <DateTime timeFormat={false} onChange={this.onStartChange} closeOnSelect={true}></DateTime>
              </div>
              <div className='column column-50'>
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
            <button onClick={this.onQuery} disabled={this.state.dateChecked ? (!this.state.startsAt || !this.state.endsAt) : false}>Keresés</button>
          </div>

          <div>
            <h4>Találatok</h4>
            {resultHitGroups.map(rhg=>{
              return <div key={`hits-${rhg}`}>
                  {resultGroups[rhg].map(result=>{
                    return <QueryResult
                      currentUser={this.context.currentUser}
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
    return query.filter(q=>q.title.toUpperCase().includes(this.refs.filter.value.toUpperCase()));
  },
  
  onFilterChange(){
    this.setState({
      filteredCompetences: this.filterResults(this.state.competences)
    });
  },
  
  onStartChange(md){
    this.setState({
      startsAt: md ? md.toDate() : null
    });
  },
  
  onEndChange(md){
    this.setState({
      endsAt: md ? md.toDate() : null
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
    queryStore.fetchQuery(requested, this.state.startsAt, this.state.endsAt, this.state.dateChecked);
    console.log(requested);
    
    this.setState({
      selectedTabIndex: 1
    });
  },
  
  onTabSelect(index){
    if(index!==this.state.selectedTabIndex){
      this.setState({
        selectedTabIndex: index
      });
    }
  },
  
  onDateClick(e){
    this.setState({
      dateChecked: e.target.checked
    });
  },
  
  onNotStrictClick(e){
    this.setState({
      notStrict: e.target.checked
    });
  }
});
