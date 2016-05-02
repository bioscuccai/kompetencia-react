import alt from '../alt/alt';

class AppActions{
  constructor(){
    this.generateActions("addMessage", "addError", "cullNofitications");
  }
}

export default alt.createActions(AppActions);
