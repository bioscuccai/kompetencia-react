"use strict";

import React from 'react';
import _ from 'lodash';
import alt from '../../alt/alt';

import competenceStore from '../../stores/competence_store';
import userStore from '../../stores/user_store';

import CompetenceSearchField from './CompetenceSearchField.jsx';
import Competence from './Competence.jsx';

import Loading from '../Loading.jsx';

export default React.createClass({
  parseCompetences(){
    let storeState=competenceStore.getState();
    return storeState.allCompetences.map(competence=>{
      let pending=_.find(storeState.pendingCompetences, ['id', competence.id]);
      let assigned=_.find(storeState.competences, ['id', competence.id]);
      return _.assign({}, competence, {
        isPending: !_.isUndefined(pending),
        isAssigned: !_.isUndefined(assigned),
        level: _.get(assigned, 'level'),
        pendingLevel: _.get(pending, 'level')
      });
    });
  },
  
  filterCompetences(){
    
  },
  
  getInitialState(){
    return {
      parsedCompetences: [], //az osszes kompetencia, jelolve, hogy milyen allapotban all
      filteredCompetences: [], //a kereso altal szurve -> ezt hasznaljuk
      profileUser: null
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
  },
  
  componentWillUnmount(){
    competenceStore.unlisten(this.handleCompetenceStoreChange);
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  handleCompetenceStoreChange(state){
    console.log("store changed");
    this.setState({
      parsedCompetences: this.parseCompetences()
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
    
    let competenceGroups=_.groupBy(this.state.parsedCompetences, 'type');
    return <div>
      <h1>
        Kompetenciák
      </h1>
      <CompetenceSearchField searchChanged={this.onSearchChanged}></CompetenceSearchField>
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
                      directlyEdit={this.props.directlyEdit}
                      key={competence.id}></Competence>;
                  })}
                </tbody>
              </table>
              
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
