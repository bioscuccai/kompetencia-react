"use strict";

import React from 'react';
import todoStore from '../../stores/todo_store';
import _ from 'lodash';
import TodoPerson from './TodoPerson.jsx';
import TodoRequest from './TodoRequest.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  
  getInitialState(){
    return {
      changedRequested: [],
      changedRelevant: [],
      pendingSubordinates: []
    };
  },
  
  componentDidMount(){
    todoStore.listen(this.handleTodoStoreChange);
    if(_.get(this.context, "currentUser.is_godfather")){
      this.tick();
      this.interval=setInterval(this.tick.bind(this), 60000);
    }
  },
  
  componentWillUnmount(){
    todoStore.unlisten(this.handleTodoStoreChange);
    clearInterval(this.interval);
  },
  
  tick(){
    todoStore.fetchTodos();
  },
  
  render(){
    if(!this.context.currentUser.is_godfather){
      return <div></div>;
    }
    let persons;
    if(this.state.pendingSubordinates.length!==0){
      persons=<div>
        {
          this.state.pendingSubordinates.map(todo=>{
            return <TodoPerson key={`pending-todo-${todo.id}`} todo={todo}></TodoPerson>;
          })
        }
      </div>;
    }
    
    let requests;
    if(this.state.changedRequested.length!==0){
      requests=<div>
        {
          this.state.changedRequested.map(todo=>{
            return <TodoRequest key={`req-${todo.id}`} todo={todo}></TodoRequest>;
          })
        }
      </div>;
    }
    
    let relevants;
    if(this.state.changedRelevant.length!==0){
      relevants=<div>
        {
          this.state.changedRelevant.map(todo=>{
            return <TodoRequest key={`rel-${todo.id}`} todo={todo}></TodoRequest>;
          })
        }
      </div>;
    }
    return <div className='todo-block'>
      <h5 className='row'>
        <div className='column column-10'>
          <i className="icon ion-ios-world"></i>
        </div>
        <div className='column column-90 center'>
          Teendők
        </div>
      </h5>
      {this.state.pendingSubordinates.length===0 && this.state.changedRelevant.length===0 && this.state.changedRequested.length===0 ? "Nincs teendő" : ""}
      {persons}
      {relevants}
      {requests}
    </div>;
  },
  
  handleTodoStoreChange(state){
    console.log(state);
    this.setState({
      pendingSubordinates: state.pendingSubordinates,
      changedRelevant: state.changedRelevant,
      changedRequested: state.changedRequested
    });
  }
});
