"use strict";

import React from 'react';
import _ from 'lodash';

import competenceStore from '../../stores/competence_store';
import CompetenceSearchField from './competence_search_field.js.jsx';
import Competence from './competence.js.jsx';

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
      filteredCompetences: [] //a kereso altal szurve -> ezt hasznaljuk
    };
  },
  
  componentDidMount(){
    competenceStore.listen(this.handleCompetenceStoreChange);
    competenceStore.fetchAllCompetences();
    competenceStore.fetchCompetences(this.props.user.id);
    competenceStore.fetchPendingCompetences(this.props.user.id);
  },
  
  componentWillUnmount(){
    competenceStore.unlisten(this.handleCompetenceStoreChange);
  },
  
  handleCompetenceStoreChange(){
    console.log("store changed");
    this.setState({
      parsedCompetences: this.parseCompetences()
    });
  },

  render(){
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
                  <th>Kompetencia</th>
                  <th>Szint</th>
                  <th>Műveletek</th>
                </thead>
                <tbody>
                  {competenceGroups[groupName].map(competence=>{
                    return <Competence competence={competence}
                      user={this.props.user}
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
