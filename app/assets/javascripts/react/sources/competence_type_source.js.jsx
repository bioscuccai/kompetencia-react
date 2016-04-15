"use strict";

import axios from 'axios';

import competenceTypeActions from '../actions/competence_type_actions.js.jsx';

export default {
  fetchCompetenceTypes: {
    remote(){
      return new Promise((resolve, reject) => {
        axios.get("/competence_types/all")
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    success: competenceTypeActions.updateCompetenceTypes,
    error: competenceTypeActions.error
  }
};
