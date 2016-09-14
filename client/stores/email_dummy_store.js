'use strict';

import alt from '../alt/alt';
import emailDummyActions from '../actions/email_dummy_actions';
import emailDummySource from '../sources/email_dummy_source';

class EmailDummyStore {
  constructor(){
    this.emails=[];
    this.bindActions(emailDummyActions);
    this.registerAsync(emailDummySource);
    this.bindListeners({
      reloadEmails: [emailDummyActions.DELETE_PENDING_STORE_SUCC]
    });
  }
  reloadEmails(){
    this.getInstance().fetchEmailDummies();
  }
  updateEmails(emails){
    this.emails=emails;
  }
}

export default alt.createStore(EmailDummyStore, "emailDummyStore");
