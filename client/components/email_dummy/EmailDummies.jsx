'use strict';

import React from 'react';
import emailDummyStore from '../../stores/email_dummy_store';
import emailDummyActions from '../../actions/email_dummy_actions';
import EmailDummy from './EmailDummy.jsx';
import MailStatus from './MailStatus.jsx';

export default React.createClass({
  getInitialState(){
    return {
      emails: [],
      mailStatus: {
        mail_enabled: false
      }
    };
  },

  componentDidMount(){
    emailDummyStore.listen(this.handleEmailStore);
    emailDummyStore.fetchEmailDummies();
    emailDummyStore.fetchMailStatus();
  },

  componentWillUnmount(){
    emailDummyStore.unlisten(this.handleEmailStore);
  },

  handleEmailStore(state){
    console.log(state);
    this.setState({
      emails: state.emails,
      mailStatus: state.mailStatus
    });
  },

  onDeletePending(){
    emailDummyActions.deletePendingStore();
  },

  render(){
    return <div>
    <h1>Aktuális függő emailek</h1>
    <MailStatus mailStatus={this.state.mailStatus}></MailStatus>
    <div>
      {this.state.emails.map(email=>{
        return <EmailDummy email={email} key={`email-${email.godfather_name}`}></EmailDummy>;
      })}
    </div>

    <div>
      <button onClick={this.onDeletePending}>Összes küldendő levél visszavonása</button>
    </div>
    </div>;
  }
});
