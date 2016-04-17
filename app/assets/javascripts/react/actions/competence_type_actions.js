import alt from '../alt/alt';
import axios from 'axios';

class CompetenceTypeActions{
  constructor(){
    this.generateActions("error", "updateCompetenceTypes");
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
