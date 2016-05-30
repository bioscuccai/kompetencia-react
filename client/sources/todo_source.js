"use strict";

import axios from 'axios';

import todoActions from '../actions/todo_actions';

export default {
  fetchTodos: {
    remote(){
      return new Promise((resolve, reject) => {
        axios.get("/users/todos", {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: todoActions.updateTodos,
    error: todoActions.error
  }
};
