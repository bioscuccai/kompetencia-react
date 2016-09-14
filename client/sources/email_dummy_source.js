'use strict';

import axios from 'axios';
import emailDummyActions from '../actions/email_dummy_actions';

export default {
  fetchEmailDummies: {
    remote(state){
      return new Promise((resolve, reject)=>{
        axios.get('/email_dummy/collect_sendable')
        .then(data=>{
          resolve(data.data.mails);
        })
      });
    },

    success: emailDummyActions.updateEmails,
    error: emailDummyActions.error
  }
}
