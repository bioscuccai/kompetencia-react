import alt from '../alt/alt.js.jsx';
import axios from 'axios';

class CompetenceTierActions{
  contructor(){
    this.generateActions("error", "selectTier", "selectTierGroup", "updateCompetenceTierGroups");
  }
  
  createCompetenceTierGroup(title, description){
    return dispatch=>{
      axios.post('/competence_tier_groups.json', {
        competence_tier_group: {
          title,
          description
        }
      }, {
          responseType: 'json'
      })
      .then(data=>{
        console.log(data);
        dispatch(data);
      });
    };
  }
  
  createCompetenceTier(title, description, competenceTierGroupId){
    return dispatch=>{
      axios.post('/competence_tiers.json', {
        competence_tier: {
          title,
          description,
          competence_tier_group_id: competenceTierGroupId
        }
      }, {
          responseType: 'json'
      })
      .then(data=>{
        console.log(data);
        dispatch(data);
      });
    };
  }
  
  updateTier(id, title, level){
    return dispatch=>{
      axios.put(`/competence_tiers/${id}.json`, {
        competence_tier: {
          title
        }
      }, {
        responseType: 'json'
      }).then(data=>{
        dispatch({
          id,
          title,
          level
        });
      });
    };
  }
  
  deleteTier(id){
    return dispatch=>{
      axios.delete(`/competence_tiers/${id}`)
      .then(data=>{
        dispatch(id);
      });
    };
  }
  
  updateTierGroup(id, title){
    return dispatch=>{
      axios.put(`/competence_tier_groups/${id}.json`, {
        competence_tier_group: {
          title
        }
      }, {
        responseType: 'json'
      })
      .then(data=>{
        dispatch({
          id,
          title
        });
      });
    };
  }
  
  deleteTierGroup(id){
    return dispatch=>{
      axios.delete(`/competence_tier_groups/${id}`)
      .then(data=>{
        dispatch(id);
      });
    };
  }
}

export default alt.createActions(CompetenceTierActions);
