import alt from '../alt/alt.js.jsx';

class AppActions{
  constructor(){
    this.generateActions("addMessage", "addError");
  }
}

export default alt.createActions(AppActions);
