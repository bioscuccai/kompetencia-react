
'use strict';

import alt from '../alt/alt.js';
import _ from 'lodash';
import axios from 'axios';

class EmaiLDummyActions {
  constructor(){
    this.generateActions('error', 'updateEmails', 'deletePendingStoreSucc');
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

}

export default alt.createActions(EmaiLDummyActions);
