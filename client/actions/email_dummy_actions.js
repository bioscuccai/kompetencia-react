
'use strict';

import alt from '../alt/alt.js';
import _ from 'lodash';
import axios from 'axios';

class EmaiLDummyActions {
  constructor(){
    this.generateActions('error', 'updateEmails',  'updateMailStatus',
      'deletePendingStoreSucc', 'enableMailSucc', 'disableMailSucc');
  }

  deletePendingStore(){
    return dispatch=>{
      return axios.get('/email_dummy/delete_pending_store')
      .then(data=>{
        this.deletePendingStoreSucc();
        return data;
      })
    }
  }

  enableMail(){
    return dispatch=>{
      return axios.get('/email_dummy/enable_mail')
      .then(data=>{
        this.enableMailSucc();
        return data;
      })
    }
  }

  disableMail(){
    return dispatch=>{
      return axios.get('/email_dummy/disable_mail')
      .then(data=>{
        this.disableMailSucc();
        return data;
      })
    }
  }

  error(err){
    console.log(err);
  }

}

export default alt.createActions(EmaiLDummyActions);
