import axios from 'axios';
import _ from 'lodash';

import competenceTierActions from '../actions/competence_tier_actions.js.jsx';

export default {
  fetchCompetenceTiers: {
    remote(){
      return new Promise((resolve, reject) => {
        axios.get("/competence_tier_groups/all", {
          responseType: 'json'
        })
        .then(data=>{
          let ctgs=data.data.map(ctg=>{ //jeloljuk, hogy egyik sincs aktualisan kijelolve szerkeszteshez
            return _.assign({}, ctg, {selected: false}, (function(){
              return {
                tiers: ctg.tiers.map(tier=>{
                  return _.assign({}, tier, {selected: false});
                })
              };
            })());
          });
          return resolve(ctgs);
        });
      });
    },
    success: competenceTierActions.updateCompetenceTierGroups,
    error: competenceTierActions.error
  }
};
