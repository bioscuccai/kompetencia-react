"use strict";

import React from 'react';
import _ from 'lodash';

import alt from '../../alt/alt';

import queryStore from '../../stores/query_store';
import userStore from '../../stores/user_store';
import competenceStore from '../../stores/competence_store';

import DateTime from 'react-datetime';

import CompetenceQueryResult from './CompetenceQueryResult.jsx';
import QueryResult from './QueryResult.jsx';
import MiniSelectedCompetences from './MiniSelectedCompetences.jsx';
import SkillCheckboxes from './SkillCheckboxes.jsx';
import {animateScroll} from 'react-scroll';

import {Tabs, Tab, TabList, TabPanel} from 'react-tabs';
import {NotificationManager} from 'react-notifications';

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
      allSkills: [],
      selectedSkillIds: [],
      lastSkillSelection: [],
      startsAt: null,
      endsAt: null,
      selectedTabIndex: 0,
      dateChecked: false,
      notStrict: false
    };
  },
  
  componentDidMount(){
    alt.recycle(queryStore, userStore, competenceStore);
    queryStore.listen(this.handleStoreChange);
    queryStore.fetchAllCompetences(); //a QueryStore is figyel erre, oda jut
    
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchAllUsers(); //felhasznalo profil: dolgozo lista
    
    competenceStore.listen(this.handleCompetenceStoreChange);
    competenceStore.fetchAllSkills();
  },
  
  componentWillUnmount() {
    queryStore.unlisten(this.handleStoreChange);
    userStore.unlisten(this.handleUserStoreChange);
    competenceStore.unlisten(this.handleCompetenceStoreChange);
  },
  
  render(){
    let resultGroups=_.groupBy(this.state.results, res=>res.found.length);
    let resultHitGroups=_.keys(resultGroups).reverse();
    
    let filteredCompetenceGroups=_.groupBy(this.state.filteredCompetences.filter(e=>e.show_title), e=>e.type);
    let filteredCompetenceTypes=_(filteredCompetenceGroups)
      .keys()
      .sortBy(e=>{
        return filteredCompetenceGroups[e].length!==0 ? filteredCompetenceGroups[e][0].priority : 20;
      })
      .value();
    
    let competencesWoTitle=_(this.state.filteredCompetences).filter(e=>!e.show_title).value();
    
    let competencesWoTitleComp=<div>
      <h4>Egyéb kompetenciák</h4>
      {competencesWoTitle.map(competence=>{
        return <CompetenceQueryResult
          competence={competence}
          key={`competence-query-${competence.id}`}
          handleCompetenceSelection={this.handleCompetenceSelection}></CompetenceQueryResult>;
      })}
    </div>;
    
    let notStrictSearch;
    
    if(this.state.dateChecked){
      notStrictSearch=<div className='row'>
        <div className='column column-20'>
          <input type='checkbox' name='not_strict_search' id='not_strict_search' ref='notStrictSearch' value="1" onClick={this.onNotStrictClick}></input>
        </div>
        <div className='column column-80'>
          Részleges szűrés?
        </div>
      </div>;
    }
    
    return <div>
      <h1>Keresés</h1>

          <div>
            <h4>Dátum</h4>
            <div className='row'>
              <div className='column column-50'>
                <div className='row'>
                  <div className='column column-20'>
                    <input type='checkbox' name='check_date' id='check_date' ref='checkDate' value="1" onChange={this.onDateClick}></input>
                  </div>
                  <div className='column column-80'>
                    Dátumra keresés?
                  </div>
                </div>
              </div>
              
              {notStrictSearch}
              
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
                <DateTime
                  defaultValue={moment().startOf("day")}
                  timeFormat={false}
                  onChange={this.onStartChange}
                  closeOnSelect={true}></DateTime>
              </div>
              <div className='column column-50'>
                <DateTime
                  defaultValue={moment().startOf("day").add(7, "days")}
                  timeFormat={false}
                  onChange={this.onEndChange}
                  closeOnSelect={true}></DateTime>
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
          
          {competencesWoTitle.length!==0 ? competencesWoTitleComp : ""}
          
          <SkillCheckboxes
            onChange={this.onSelectedSkillChange}
            allSkills={this.state.allSkills}></SkillCheckboxes>
          
          <div>
            <button onClick={this.onQuery} disabled={this.state.dateChecked ? (!this.state.startsAt || !this.state.endsAt) : false}>Keresés</button>
          </div>

          <div>
            <h4>Találatok</h4>
            {resultHitGroups.map(rhg=>{
              return <div key={`hits-${rhg}`}>
                  {resultGroups[rhg].map(result=>{
                    return <QueryResult
                      allUsers={this.state.allUsers}
                      currentUser={this.context.currentUser}
                      result={result}
                      highlightedSkillIds={this.state.lastSkillSelection}
                      key={`result-${result.id}`}></QueryResult>;
                  })}
              </div>;
            })}
          </div>

    </div>;
  },
  
  handleStoreChange(state){
    if(!_.isEqual(this.state.results, state.results)){
      NotificationManager.info(`${state.results.length} találat`);
      animateScroll.scrollMore(200);
    }
    this.setState({
      competences: state.competenceQuery,
      selectedCompetences: state.competenceQuery.filter(e=>!_.isNil(e.selectedLevel)),
      filteredCompetences: this.filterResults(state.competenceQuery),
      results: state.results
    });
  },
  
  handleUserStoreChange(state){
    this.setState({
      allUsers: state.allUsers,
      profileUser: state.profileUser
    });
  },
  
  handleCompetenceStoreChange(state){
    this.setState({
      allSkills: state.allSkills
    });
  },
  
  onSelectedSkillChange(selectedSkillIds){
    this.setState({
      selectedSkillIds
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
  
  onSkillListChange(skillIds){
    
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
    this.setState({
      lastSkillSelection: this.state.selectedSkillIds
    });
    queryStore.fetchQuery(requested, this.state.startsAt, this.state.endsAt,
      this.state.dateChecked, this.state.notStrict,
      this.state.selectedSkillIds);
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
      dateChecked: e.target.checked,
      notStrict: false
    });
  },
  
  onNotStrictClick(e){
    this.setState({
      notStrict: e.target.checked
    });
  }
});
