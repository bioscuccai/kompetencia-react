import alt from '../alt/alt';

class AppActions{
  constructor(){
    this.generateActions("addMessage", "addError", "cullNofitications", "updateCurrentUser");
  }
}

export default alt.createActions(AppActions);
