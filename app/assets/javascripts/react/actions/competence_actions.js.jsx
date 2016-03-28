class CompetenceActions{
  updateAllCompetences(allCompetences){
    return allCompetences;
  }
  
  updatePendingCompetences(pendingCompetences){
    return pendingCompetences;
  }
  
  updateCompetences(competences){
    return competences;
  }
  
  error(err){
    return err;
  }
  
  //ezen keresztul szol a store-nak, hogy frissitse az user kompetenciait miutan visszajelzett a szero
  setLevel(competenceId, userId, level){
    return dispatch=>{
      axios.post(`/users/${userId}/add_competence`,{
        competence_id: competenceId,
        level
      })
      .then(data=>{
        console.log(data);
        dispatch({
          competenceId,
          userId,
          level
        });
      });
      
    };
  }
  
  removeAssigned(competenceId, userId){
    return dispatch=>{
      axios.post(`/users/${userId}/remove_competence`, {
          competence_id: competenceId
      },{
        responseType: 'json'
      })
      .then(data=>{
        console.log(data);
        dispatch({
          competenceId,
          userId
        });
      });
      
    };
  }
  
  removePending(competenceId, userId){
    return dispatch=>{
      dispatch({
        competenceId,
        userId
      });
    };
  }
}

window.competenceActions=alt.createActions(CompetenceActions);
