import axios from 'axios';

import queryActions from '../actions/query_actions.js.jsx';

export default {
  fetchQuery: {
    remote(state, competences, startsAt, endsAt){
      return new Promise((resolve, reject) => {
        axios.post('/query/query', {
          competences,
          starts_at: startsAt,
          ends_at: endsAt
        }, {
          responseType: 'json'
        })
        .then(data=>{
          console.log(data.data);
          return resolve(data.data);
        });
      });
    },
    
    success: queryActions.updateResults,
    error: queryActions.error
  }
};
