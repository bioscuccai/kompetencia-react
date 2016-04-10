class UserStore{
  constructor(){
    this.allUsers=[];
    this.subordinates=[];
    this.bindActions(userActions);
    this.registerAsync(userSource);
  }
  
  addSubordinate(){
    this.getInstance().fetchAllUsers();
  }
  
  removeSubordinate(){
    this.getInstance().fetchAllUsers();
  }
  
  updateAllUsers(allUsers){
    this.allUsers=allUsers;
  }
  
  error(err){
    console.log(err);
  }
}

window.userStore=alt.createStore(UserStore);
