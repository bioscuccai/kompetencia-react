import React from 'react';
import competenceTierStore from '../../stores/competence_tier_store.js.jsx';

import CompetenceTierGroup from './competence_tier_group.js.jsx';
import NewCompetenceTierGroup from './new_competence_tier_group.js.jsx';


export default React.createClass({
  getInitialState(){
    return {
      competenceTierGroups: []
    };
  },
  
  componentDidMount(){
    competenceTierStore.listen(this.handleStoreChange);
    competenceTierStore.fetchCompetenceTiers();
  },
  
  componentWillUnmount(){
    competenceTierStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    return <div>
      <h1>Válasz sablonok</h1>
      {this.state.competenceTierGroups.map(group=>{
        return <CompetenceTierGroup group={group} key={group.id}></CompetenceTierGroup>;
      })}
      <NewCompetenceTierGroup></NewCompetenceTierGroup>
    </div>;
  },
  
  handleStoreChange(){
    this.setState({
      competenceTierGroups: competenceTierStore.getState().competenceTierGroups
    });
  }
});
