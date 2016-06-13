"use strict";

import React from 'react';
import _ from 'lodash';
import alt from '../../alt/alt';
import auth from '../../lib/auth';
import axios from 'axios';

import competenceStore from '../../stores/competence_store';
import userStore from '../../stores/user_store';

import CompetenceSearchField from './CompetenceSearchField.jsx';
import Competence from './Competence.jsx';
import SkillSelector from './SkillSelector.jsx';
import UserBulletpoints from '../user/UserBulletpoints.jsx';
import UserSkillList from '../skill/UserSkillList.jsx';
import MassAcceptButton from './MassAcceptButton.jsx';

import Loading from '../Loading.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  parseCompetences(state){
    return state.allCompetences.map(competence=>{
      let pending=_.find(state.pendingCompetences, ['id', competence.id]);
      let assigned=_.find(state.competences, ['id', competence.id]);
      return _.assign({}, competence, {
        isPending: !_.isUndefined(pending),
        isAssigned: !_.isUndefined(assigned),
        level: _.get(assigned, 'level'),
        pendingLevel: _.get(pending, 'level')
      });
    });
  },
  
  getInitialState(){
    return {
      parsedCompetences: [], //az osszes kompetencia, jelolve, hogy milyen allapotban all
      filteredCompetences: [], //a kereso altal szurve -> ezt hasznaljuk
      profileUser: null,
      allSkills: [],
      userLoadedOnce: false
    };
  },
  
  componentDidMount(){
    alt.recycle(competenceStore, userStore);
    userStore.listen(this.handleUserStoreChange);
    competenceStore.listen(this.handleCompetenceStoreChange);
    this.fetch(this.props);
  },
  
  fetch(props){
    console.log(`fetching ${props.params.profileUserId}`);
    userStore.fetchProfileUser(parseInt(props.params.profileUserId));
    competenceStore.fetchAllCompetences();
    competenceStore.fetchCompetences(parseInt(props.params.profileUserId));
    competenceStore.fetchPendingCompetences(parseInt(props.params.profileUserId));
    competenceStore.fetchAllSkills();
  },
  
  componentWillReceiveProps(props){
    this.fetch(props);
  },
  
  componentWillUnmount(){
    competenceStore.unlisten(this.handleCompetenceStoreChange);
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  handleCompetenceStoreChange(state){
    this.setState({
      parsedCompetences: this.parseCompetences(state),
      filteredCompetences: this.parseCompetences(state),
      allSkills: state.allSkills
    });
  },
  
  handleUserStoreChange(state){
    if(state.profileUser){
      
      if(this.context.currentUser.is_godfather && parseInt(state.profileUser.godfather_id)===parseInt(this.context.currentUser.id)){
        axios.get(`/users/${this.props.params.profileUserId}/notify_seen_by_godfather`, {responseType: 'json'})
        .then(data=>{});
      }
    }
    this.setState({
      profileUser: state.profileUser,
      userLoadedOnce: !!state.profileUser
    });
  },

  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }    
    let competenceGroups=_.groupBy(this.state.filteredCompetences.filter(e=>e.show_title), 'type');
    let competenceGroupNames=_(competenceGroups)
      .keys()
      .sortBy(e=>{
        return competenceGroups[e].length!==0 ? competenceGroups[e][0].priority : 20;
      })
      .value();
    let competenceGroupsWoTitle=_.groupBy(this.state.filteredCompetences.filter(e=>!e.show_title), 'type');
    
    let titlelessCompetences=_.flatten(_.keys(competenceGroupsWoTitle).map(groupName=>{
      return competenceGroupsWoTitle[groupName];
    }));
    
    let headStyle={
      width: '25em'
    };
    
    let titlelessCompetenceList=<div>
      <h4>Egyéb kompetenciák</h4>
      <table>
        <thead>
          <tr>
            <th className='competence-table-title'>Kompetencia</th>
            <th>Szint</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {titlelessCompetences.map(competence=>{
            return <Competence competence={competence}
              user={this.state.profileUser}
              currentUser={this.context.currentUser}
              key={`comp-${competence.id}`}></Competence>;
          })}
        </tbody>
      </table>
    </div>;
    
    return <div>
      <h1>
        Kompetenciák
      </h1>
      <h3>
        {this.state.profileUser.name}
      </h3>
      <div>
        <input type="text" placeholder="Szűrés" ref='filter' onChange={this.onSearchChanged}/>
      </div>
      <div>
        {
          competenceGroupNames.map(groupName=>{
            return <div key={`competence-group-${groupName}`}>
              <h4 className='clearfix'>
                <span className='float-left'>
                  {groupName}
                </span>
                <span className='float-right'>
                  <MassAcceptButton
                    currentUser={this.context.currentUser}
                    competences={competenceGroups[groupName]}
                    profileUser={this.state.profileUser}></MassAcceptButton>
                </span>
              </h4>
              {_.get(competenceGroups[groupName], "[0].description")}
              <table>
                <thead>
                  <tr>
                    <th className='competence-table-title'>Kompetencia</th>
                    <th>Szint</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {competenceGroups[groupName].map(competence=>{
                    return <Competence competence={competence}
                      user={this.state.profileUser}
                      currentUser={this.context.currentUser}
                      key={`comp-${competence.id}`}></Competence>;
                  })}
                </tbody>
              </table>
              
            </div>;
          })
        }
      </div>
      
      {titlelessCompetences.length!==0 ? titlelessCompetenceList : ""}
      
      <h2>Informatikához köthető egyéb ismeretek</h2>
      
      <UserSkillList
        skills={this.state.profileUser.skills}
        profileUser={this.state.profileUser}
        currentUser={this.context.currentUser}
        ></UserSkillList>
      <SkillSelector allSkills={this.state.allSkills} profileUser={this.state.profileUser}></SkillSelector>
    </div>;
  },
  
  onSearchChanged(searchQuery){
    this.setState({
      filteredCompetences: this.state.parsedCompetences.filter(c=>c.title.toUpperCase().includes(this.refs.filter.value.toUpperCase()) || c.type.toUpperCase().includes(this.refs.filter.value.toUpperCase())),
    });
  }
});
