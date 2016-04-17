"use strict";

import React from 'react';
import competenceActions from '../../actions/competence_actions';

export default React.createClass({
  render(){
    let removeButton=null;
    let pendingButton=null;
    if(this.props.competence.isAssigned){
      removeButton=<a className='button' href="#" onClick={this.removeAssigned}><i className='icon ion-trash-a'></i></a>;
    }
    if(this.props.competence.isPending && this.props.directlyEdit){
      pendingButton=<span>
        <a href="#" className='button' onClick={this.rejectPending}><i className='icon ion-close'></i></a>
        <a href="#" className='button' onClick={this.acceptPending}><i className='icon ion-checkmark'></i></a>
      </span>;
    }
    return <span>
      {removeButton}
      {pendingButton}
    </span>;
  },
  
  removeAssigned(e){
    e.preventDefault();
    competenceActions.removeAssigned(this.props.competence.id, this.props.user.id);
  },
  
  rejectPending(e){
    e.preventDefault();
    competenceActions.rejectPending(this.props.competence.id, this.props.user.id);
  },
  
  acceptPending(e){
    e.preventDefault();
    competenceActions.acceptPending(this.props.competence.id, this.props.user.id);
  }
});
