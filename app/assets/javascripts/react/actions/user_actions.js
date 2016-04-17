import alt from '../alt/alt.js.jsx';
import axios from 'axios';

class UserActions{
  constructor(){
    this.generateActions("error", "updateAllUsers", "updateSubordinates");
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
}

export default alt.createActions(UserActions);
