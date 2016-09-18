'use strict';

import React from 'react';
import emailActions from '../../actions/email_dummy_actions';

export default React.createClass({
  render(){
    if(this.props.mailStatus.mail_enabled){
      return <div>
        E-mail küldés bekapcsolva
        <button onClick={emailActions.disableMail}>Kikapcsolás</button>
      </div>;
    } else {
      return <div>
        E-mail küldés kikapcsolva
        <button onClick={emailActions.enableMail}>Bekapcsolás</button>
      </div>;
    }
  }
});
