"use strict";

import axios from 'axios';

import userActions from '../actions/user_actions';

export default {
  fetchAllUsers: {
    remote(){
      return new Promise((resolve, reject) => {
        axios.get('/users.json',{
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateAllUsers,
    error: userActions.error
  },
  
  fetchSubordinates: {
    remote(state, userId){
      return new Promise(function(resolve, reject) {
        axios.get(`/users/${userId}/subordinates.json`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateSubordinates,
    error: userActions.error
  },
  
  fetchProfileUser: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}.json`, {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateProfileUser,
    error: userActions.error
  },
  
  fetchGodfathers: {
    remote(state){
      return new Promise((resolve, reject) => {
        axios.get("/users/godfathers", {
          responseType: 'json'
        })
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateGodfathers,
    error: userActions.error
  },
  
  fetchProfileAvailabilities: {
    remote(state, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}/availabilities`, {responseType: 'json'})
        .then(data=>{
          return resolve(data.data);
        });
      });
    },
    
    success: userActions.updateProfileAvailabilities,
    error: userActions.error
  }
};
