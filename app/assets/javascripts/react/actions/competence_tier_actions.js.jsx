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
  
  error(err){
    return err;
  }
}

window.competenceTierActions=alt.createActions(CompetenceTierActions);
