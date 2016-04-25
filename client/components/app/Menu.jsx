"use strict";

import React from 'react';
import {Link} from 'react-router';
import auth from '../../lib/auth';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  render(){
    let competenceButtons;
    if(auth.canAlterCompetences(this.context.currentUser)){
      competenceButtons=<span>
        <div className='center'>Kompetenciák</div>
        <div className='menu-item'>
          <Link to='/competence_types'><i className='icon ion-social-tux'></i> Kompetenciák</Link>
        </div>
        <div className='menu-item'>
          <Link to='/competence_tier_groups'><i className='icon ion-android-bulb'></i> Válasz típusok</Link>
        </div>
      </span>;
    }
    return <div>
      <div className='menu-item'>
        <Link to='/'><i className='icon ion-android-calendar'></i> Friss hiredtések</Link>
      </div>
      <div className='menu-item'>
        <Link to='/users'><i className='icon ion-person-stalker'></i> Felhasználók</Link>
      </div>
      <div className='menu-item'>
        <Link to='/query'><i className='icon ion-search'></i> Keresés</Link>
      </div>
      <div className='menu-item'>
        <Link to={`/subordinates/${this.context.currentUser.id}`}><i className='icon ion-android-contacts'></i> Dolgozóim</Link>
      </div>
      <div className='menu-item'>
        <Link to={`/person_requests/${this.context.currentUser.id}`}><i className='icon ion-bag'></i> Hirdetések</Link>
      </div>
      <div className='menu-item'>
        <Link to={`/competence_chooser/${this.context.currentUser.id}`}><i className='icon ion-trophy'></i> Kompetenciáim</Link>
      </div>
      {competenceButtons}
    </div>;
  }
});
