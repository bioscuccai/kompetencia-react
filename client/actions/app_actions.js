import alt from '../alt/alt';

class AppActions{
  constructor(){
    this.generateActions("addMessage", "addError");
  }
}

export default alt.createActions(AppActions);
