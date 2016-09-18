'use strict';

import alt from '../alt/alt';
import emailDummyActions from '../actions/email_dummy_actions';
import emailDummySource from '../sources/email_dummy_source';

class EmailDummyStore {
  constructor(){
    this.emails=[];
    this.mailStatus={
      mail_enabled: false
    };
    this.bindActions(emailDummyActions);
    this.registerAsync(emailDummySource);
    this.bindListeners({
      reloadEmails: [
        emailDummyActions.DELETE_PENDING_STORE_SUCC
      ],
      reloadMailStatus: [
        emailDummyActions.ENABLE_MAIL_SUCC,
        emailDummyActions.DISABLE_MAIL_SUCC
      ]
    });
  }
  reloadEmails(){
    this.getInstance().fetchEmailDummies();
  }
  reloadMailStatus(){
    console.log('mail status');
    this.getInstance().fetchMailStatus();
  }
  updateEmails(emails){
    this.emails=emails;
  }

  updateMailStatus(status){
    this.mailStatus=status;
  }
}

export default alt.createStore(EmailDummyStore, "emailDummyStore");
