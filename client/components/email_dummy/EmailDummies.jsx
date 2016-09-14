'use strict';

import React from 'react';
import emailDummyStore from '../../stores/email_dummy_store';
import emailDummyActions from '../../actions/email_dummy_actions';
import EmailDummy from './EmailDummy.jsx';

export default React.createClass({
  getInitialState(){
    return {
      emails: []
    };
  },

  componentDidMount(){
    emailDummyStore.listen(this.handleEmailStore);
    emailDummyStore.fetchEmailDummies();
  },

  componentWillUnmount(){
    emailDummyStore.unlisten(this.handleEmailStore);
  },

  handleEmailStore(state){
    console.log(state);
    this.setState({
      emails: state.emails
    });
  },

  onDeletePending(){
    emailDummyActions.deletePendingStore();
  },

  render(){
    return <div>
    <h1>Dummy emailek</h1>
    <div>
      {this.state.emails.map(email=>{
        return <EmailDummy email={email} key={`email-${email.godfather_name}`}></EmailDummy>;
      })}
    </div>
    
    <div>
      <button onClick={this.onDeletePending}>Eddigi események elküldöttnek jelölése</button>
    </div>
    </div>;
  }
});
