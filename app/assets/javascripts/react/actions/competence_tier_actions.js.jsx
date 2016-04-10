class CompetenceTierActions{
  updateCompetenceTierGroups(competenceTierGroups){
    return competenceTierGroups;
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
  
  selectTier(id){
    return id;
  }
  
  selectTierGroup(id){
    return id;
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
  
  error(err){
    return err;
  }
}

window.competenceTierActions=alt.createActions(CompetenceTierActions);
