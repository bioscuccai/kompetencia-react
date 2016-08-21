"use strict";

import React from 'react';
import _ from 'lodash';

import alt from '../../alt/alt';

import queryStore from '../../stores/query_store';
import userStore from '../../stores/user_store';
import competenceStore from '../../stores/competence_store';
import queryActions from '../../actions/query_actions';

import DateTime from 'react-datetime';
import Sort from '../Sort.jsx';

import CompetenceQueryResult from './CompetenceQueryResult.jsx';
import QueryResult from './QueryResult.jsx';
import MiniSelectedCompetences from './MiniSelectedCompetences.jsx';
import SkillCheckboxes from './SkillCheckboxes.jsx';
import SaveQueryButton from './SaveQueryButton.jsx';
import {animateScroll, Element, scroller} from 'react-scroll';

import classNames from 'classnames';

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
      sortedResults: [],
      allSkills: [],
      selectedSkillIds: [],
      lastSkillSelection: [],
      startsAt: moment().startOf("day"),
      endsAt: moment().startOf("day").add(7, "days"),
      selectedTabIndex: 0,
      dateChecked: false,
      notStrict: false,
      showPending: false,
      matchAll: false,
      floaterExpanded: false,
      onlySubordinates: false,
      sortBy: 'relevance',
      asc: false
    };
  },
  
  parseQueryString(){
    if(!this.props.params.queryString) return;
    let queryObj=JSON.parse(this.props.params.queryString);
    let compiledCompetences=queryObj.cl.map(c=>{
      return {
        competence_id: c.c,
        level: c.l
      };
    });
    
    queryStore.fetchQuery(compiledCompetences, null, null,
      null, null,
      [],
      queryObj.sp, queryObj.ma, queryObj.os);
  },
  
  componentDidMount(){
    alt.recycle(queryStore, userStore, competenceStore);
    queryStore.listen(this.handleStoreChange);
    queryStore.fetchAllCompetences(); //a QueryStore is figyel erre, oda jut
    
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchAllUsers(); //felhasznalo profil: dolgozo lista
    
    competenceStore.listen(this.handleCompetenceStoreChange);
    competenceStore.fetchAllSkills();
    
    this.parseQueryString();
  },
  
  componentWillUnmount() {
    queryStore.unlisten(this.handleStoreChange);
    userStore.unlisten(this.handleUserStoreChange);
    competenceStore.unlisten(this.handleCompetenceStoreChange);
  },
  
  render(){
    let hideBox={
      display: 'none'
    };
    
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
    
    let floaterButtonClass=classNames({
      icon: true,
      'ion-arrow-shrink': this.state.floaterExpanded,
      'ion-arrow-expand': !this.state.floaterExpanded,
      'font-150': true
    });
    
    let floaterVisibility=classNames({
      'floater-body-hidden': !this.state.floaterExpanded
    });
    
    return <div>
      <div className='top-floater'>
        <div className='clearfix'>
          <div className='float-left'>
            <h1 className='no-margin'>Keresés</h1>
          </div>
          <div className='float-right'>

            <button onClick={this.onQuery}>
              <i className='icon ion-search font-150'></i>
              &nbsp;
              Keresés
            </button>

            <SaveQueryButton
              currentUser={this.context.currentUser}
              competences={this.selectedCompetenceArray()}
              matchAll={this.state.matchAll}
              onlySubordinates={this.state.onlySubordinates}
              showPending={this.state.showPending}></SaveQueryButton>

          </div>
        </div>
        
        <div>
          <MiniSelectedCompetences competences={this.state.selectedCompetences}></MiniSelectedCompetences>
        </div>
      </div>
      
      
      <h1>&nbsp;</h1>
      
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
              value={this.state.startsAt}
              timeFormat={false}
              onChange={this.onStartChange}
              closeOnSelect={true}></DateTime>
          </div>
          <div className='column column-50'>
            <DateTime
              value={this.state.endsAt}
              timeFormat={false}
              onChange={this.onEndChange}
              closeOnSelect={true}></DateTime>
          </div>
        </div>
        <div>
          <input type='checkbox' name='check_pending'
            ref='checkPending'
            onChange={this.onPendingChange}
            value={this.state.showPending}></input>
          Még nem validált kompetenciák figyelembevétele
        </div>
        
        <div>
          <input type='checkbox' name='match_all'
            ref='matchAll'
            onChange={this.onMatchAll}
            value={this.state.matchAll}>
          </input>
          Összes kompetencia stimmeljen?
        </div>
        
        <div>
          <input type='checkbox' name='only_subordinates'
            ref='onlySubordinates'
            onChange={this.onOnlySubordinates}
            value={this.state.onlySubordinates}>
          </input>
          Csak a dolgozóim
        </div>
          
          <div>
            <h4>Kompetencia</h4>
            <input type='text' placeholder='Kompetencia szűrő' onChange={this.onFilterChange} ref='filter'></input>
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
          
          
          <Element name="hitsScroll"></Element>
          <div>
            <h4>Találatok</h4>
            <Sort
              fields={[
                {name: 'Relevancia', value: 'relevance'},
                {name: 'Név', value: 'name'},
                {name: 'Mentor', value: 'godfather_name'}
              ]}
              initialIndex={0}
              initialDirection={false}
              onChange={this.onSortChange}>
              
            </Sort>
            {this.state.sortedResults.map(result=>{
              return <QueryResult
                allUsers={this.state.allUsers}
                currentUser={this.context.currentUser}
                result={result}
                highlightedSkillIds={this.state.lastSkillSelection}
                key={`result-${result.id}`}></QueryResult>;
            })}

          </div>

    </div>;
  },
  
  sortedResultsBy(results, order, asc){
    return _.orderBy(results, [item=>{
      if(_.isString(item[order])){
        return _.deburr(item[order]).toLowerCase();
      }
      return item[order];
    }
    ], [asc ? 'asc' : 'desc']);
  },
  
  onSortChange(order, asc){
    this.setState({
      sortedResults: this.sortedResultsBy(this.state.results, order, asc)
    });
  },
  
  handleStoreChange(state){
    if(!_.isEqual(this.state.results, state.results)){
      NotificationManager.info(`${state.results.length} találat`);
      //animateScroll.scrollMore(200);
      scroller.scrollTo("hitsScroll", {
        duration: 500
      });
    }
    this.setState({
      competences: state.competenceQuery,
      selectedCompetences: state.competenceQuery.filter(e=>!_.isNil(e.selectedLevel)),
      filteredCompetences: this.filterResults(state.competenceQuery),
      results: state.results,
      sortedResults: this.sortedResultsBy(state.results, this.state.sortBy, this.state.asc)
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
      allSkills: _.sortBy(state.allSkills, item=>item.name.trim().toUpperCase())
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
  
  onPendingChange(e){
    this.setState({
      showPending: e.target.checked
    });
  },
  
  onMatchAll(e){
    this.setState({
      matchAll: e.target.checked
    });
  },
  
  selectedCompetenceArray(){
    return this.state.selectedCompetences.map(competence=>{
      return {
        competence_id: competence.id,
        level: competence.selectedLevel
      };
    });
  },
  
  onQuery(e){
    e.preventDefault();
    let requested=this.selectedCompetenceArray();
    this.setState({
      lastSkillSelection: this.state.selectedSkillIds
    });
    queryStore.fetchQuery(requested, this.state.startsAt, this.state.endsAt,
      this.state.dateChecked, this.state.notStrict,
      this.state.selectedSkillIds,
      this.state.showPending, this.state.matchAll, this.state.onlySubordinates);
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
  },
  
  onOnlySubordinates(e){
    this.setState({onlySubordinates: e.target.checked});
  },
  
  toggleExpand(){
    this.setState({floaterExpanded: !this.state.floaterExpanded});
  }
});
