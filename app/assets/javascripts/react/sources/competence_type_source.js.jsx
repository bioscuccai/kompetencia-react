window.competenceTypeSource={
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
