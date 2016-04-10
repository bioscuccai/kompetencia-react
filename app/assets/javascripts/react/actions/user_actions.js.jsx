class UserActions{
  updateAllUsers(users){
    return users;
  }
  
  updateSubordinates(subordinates){
    return subordinates;
  }
  
  //ezek a felhasznalonak a keresztapjat allitjak be
  //nem pedig a keresztapa ala adnak egy kovetot
  addSubordinate(userId, subId){
    return dispatch=>{
      axios.post(`/users/${subId}/add_godfather`, {
        godfather_id: userId
      }, {
        responseType: 'json'
      })
      .then(data=>{
        dispatch({
          userId,
          subId
        });
      });
    };
  }
  
  removeSubordinate(userId, subId){
    return dispatch=>{
      axios.post(`/users/${subId}/remove_godfather`,{}, {
        responseType: 'json'
      })
      .then(data=>{
        dispatch({
          userId,
          subId
        });
      });
    };
  }
  
  error(err){
    
  }
}

window.userActions=alt.createActions(UserActions);
