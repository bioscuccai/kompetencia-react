"use strict";

import axios from 'axios';

import queryActions from '../actions/query_actions';

export default {
  fetchQuery: {
    remote(state, competences, startsAt, endsAt, checkDate=false, notStrictSearch=false, selectedSkillIds=[],
        showPending=false, matchAll=false, onlySubordinates=false){
      return new Promise((resolve, reject) => {
        axios.post('/query/query', {
          competences,
          starts_at: startsAt,
          ends_at: endsAt,
          check_date: checkDate,
          not_strict_search: notStrictSearch,
          selected_skill_ids: selectedSkillIds,
          show_pending: showPending,
          match_all: matchAll,
          only_subordinates: onlySubordinates
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
