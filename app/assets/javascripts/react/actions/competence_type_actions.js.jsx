import alt from '../alt/alt.js.jsx';
import axios from 'axios';

class CompetenceTypeActions{
  updateCompetenceTypes(competenceTypes){
    return competenceTypes;
  }
  
  createCompetenceType(title, competenceTierGroupId){
    return dispatch=>{
      axios.post('/competence_types.json', {
        competence_type: {
          title,
          competence_tier_group_id: competenceTierGroupId
        }
      }).then(data=>{
        return dispatch({
          title,
          competenceTierGroupId
        });
      });
    };
  }
  
  error(err){
    return err;
  }
  
  createCompetence(title, competenceTypeId){
    return dispatch=>{
      axios.post('/competences.json', {
        competence: {
          title,
          competence_type_id: competenceTypeId
        }
      })
      .then(data=>{
        return dispatch({
          title,
          competenceTypeId
        });
      });
    };
  }
}

export default alt.createActions(CompetenceTypeActions);
