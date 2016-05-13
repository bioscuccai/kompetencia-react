"use strict";

import axios from 'axios';

import queryActions from '../actions/query_actions';

export default {
  fetchQuery: {
    remote(state, competences, startsAt, endsAt, checkDate, notStrictSearch){
      return new Promise((resolve, reject) => {
        axios.post('/query/query', {
          competences,
          starts_at: startsAt,
          ends_at: endsAt,
          check_date: checkDate,
          not_strict_search: notStrictSearch
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
