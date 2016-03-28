window.competenceSource={
  fetchAllCompetences: {
    remote(state){
      return new Promise((resolve, reject)=>{
        axios.get("/competences/all", {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updateAllCompetences,
    error: competenceActions.error
  },
  
  fetchCompetences: {
    remote(state, userId){
      return new Promise((resolve, reject)=>{
        axios.get(`/users/${userId}/competences`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updateCompetences,
    error: competenceActions.error
  },
  
  fetchPendingCompetences: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}/pending_competences`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: competenceActions.updatePendingCompetences,
    error: competenceActions.error
  }
};
