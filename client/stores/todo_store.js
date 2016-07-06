"use strict";

import alt from '../alt/alt';
import uuid from 'node-uuid';
import _ from 'lodash';
import todoSource from '../sources/todo_source';
import todoActions from '../actions/todo_actions';

class TodoStore{
  constructor(){
    this.pendingSubordinates=[];
    this.changedRelevant=[];
    this.changedRequested=[];
    this.bindActions(todoActions);
    this.registerAsync(todoSource);
  }
  
  updateTodos(todos){
    this.pendingSubordinates=_.get(todos, "pending_subordinates", []);
    this.changedRequested=_.get(todos, "changed_requested", []);
    this.changedRelevant=_.get(todos, "changed_relevant", []);
  }
  
  tickTodo(id){
    this.todos=this.todos.filter(e=>e.id!==id);
  }
  
  notifySeenByGodfather(userId){
    
  }
  
  notifySeenRelevant(){
    
  }
  
  notifySeenRequested(){
    
  }
  
  error(e){
    return false;
  }
}

export default alt.createStore(TodoStore, "todoStore");
