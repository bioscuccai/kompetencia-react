"use strict";

import React from 'react';
import _ from 'lodash';
import alt from '../../alt/alt';
import auth from '../../lib/auth';

import competenceStore from '../../stores/competence_store';
import userStore from '../../stores/user_store';

import CompetenceSearchField from './CompetenceSearchField.jsx';
import Competence from './Competence.jsx';
import SkillSelector from './SkillSelector.jsx';
import UserBulletpoints from '../user/UserBulletpoints.jsx';
import UserSkillList from '../skill/UserSkillList.jsx';

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
      allSkills: []
    };
  },
  
  componentDidMount(){
    alt.recycle(competenceStore, userStore);
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileUser(parseInt(this.props.params.profileUserId));
    competenceStore.listen(this.handleCompetenceStoreChange);
    competenceStore.fetchAllCompetences();
    competenceStore.fetchCompetences(parseInt(this.props.params.profileUserId));
    competenceStore.fetchPendingCompetences(parseInt(this.props.params.profileUserId));
    competenceStore.fetchAllSkills();
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
    this.setState({
      profileUser: state.profileUser
    });
  },

  render(){
    if(!this.state.profileUser){
      return <Loading></Loading>;
    }
    
    let competenceGroups=_.groupBy(this.state.filteredCompetences, 'type');
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
          _.keys(competenceGroups).map(groupName=>{
            return <div key={`competence-group-${groupName}`}>
              <h4>{groupName}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Kompetencia</th>
                    <th>Szint</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {competenceGroups[groupName].map(competence=>{
                    return <Competence competence={competence}
                      user={this.state.profileUser}
                      currentUser={this.context.currentUser}
                      key={competence.id}></Competence>;
                  })}
                </tbody>
              </table>
              
            </div>;
          })
        }
      </div>
      
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
