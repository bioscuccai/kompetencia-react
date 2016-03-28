window.competenceTierSource={
  fetchCompetenceTiers: {
    remote(){
      return new Promise((resolve, reject) => {
        axios.get("/competence_tier_groups/all", {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    success: competenceTierActions.updateCompetenceTierGroups,
    error: competenceTierActions.error
  }
};
