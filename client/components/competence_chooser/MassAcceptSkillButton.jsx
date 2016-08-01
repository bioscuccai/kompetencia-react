'use strict';

import React from 'react';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import auth from '../../lib/auth';

import competenceActions from '../../actions/competence_actions';

export default React.createClass({
  render(){
    if(!this.props.profileUser){
      return <span></span>;
    }
    let pending=this.props.profileUser.skills.filter(item=>!item.confirmed);
    if (!auth.canAcceptCompetenceOf(this.props.profileUser, this.props.currentUser) || pending.length===0) {
      return <span></span>;
    }
    return <button onClick={this.onMassSkill}>
      <i className='icon ion-checkmark-round'></i>
      Összes skill elfogadása ({pending.length})
    </button>;
  },
  
  onMassSkill(){
    let pending=this.props.profileUser.skills.filter(item=>!item.confirmed);
    competenceActions.massAcceptSkill(this.props.profileUser.id, pending.map(item=>item.id))
    .then(data=>{
      if(_.get(data, "data.status")==='ok'){
        NotificationManager.info("Sikeres elfogadás");
      } else {
        NotificationManager.error("Hiba");
      }
    })
    .catch(e=>{
      console.log(e);
      NotificationManager.error("Hiba");
    });
  }
});
