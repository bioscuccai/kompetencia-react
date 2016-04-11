import alt from '../alt/alt.js.jsx';
import axios from 'axios';

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

  setPendingLevel(competenceId, userId, level){
    return dispatch=>{
      axios.post(`/users/${userId}/add_pending_competence`, {
        competence_id: competenceId,
        user_id: userId,
        level
      })
      .then(data=>{
        dispatch({
          competenceId,
          userId,
          level
        });
      });
    };
  }
  
  acceptPending(competenceId, userId){
    return dispatch=>{
      axios.post(`/users/${userId}/accept_pending_competence`, {
        user_id: userId,
        competence_id: competenceId
      })
      .then(data=>{
        dispatch({
          competenceId,
          userId
        });
      });
    };
  }
  
  rejectPending(competenceId, userId){
    return dispatch=>{
      axios.post(`/users/${userId}/reject_pending_competence`, {
        user_id: userId,
        competence_id: competenceId
      })
      .then(data=>{
        dispatch({
          competenceId,
          userId
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
}

export default alt.createActions(CompetenceActions);
