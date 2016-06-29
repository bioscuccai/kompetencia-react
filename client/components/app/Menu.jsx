"use strict";

import React from 'react';
import {Link} from 'react-router';
import auth from '../../lib/auth';
import TodoBlock from '../todos/TodoBlock.jsx';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  render(){
    let competenceButtons;
    if(auth.canAlterCompetences(this.props.currentUser)){
      competenceButtons=<span>
        
        <div className='small-spacer'></div>
        
        <div className='menu-item'>
          <Link to='/competence_types'><i className='icon ion-social-tux'></i> Kompetenciák</Link>
        </div>
        <div className='menu-item'>
          <Link to='/competence_tier_groups'><i className='icon ion-android-bulb'></i> Válasz típusok</Link>
        </div>
      </span>;
    }
    
    let statsButton;
    if(this.props.currentUser.is_admin){
      statsButton=<div className='menu-item'>
        <Link to='/stats'>
          <i className='icon ion-calculator'></i> Statisztikák
        </Link>
      </div>;
    }
    
    let godfatherButtons;
    if(this.props.currentUser.is_godfather){
      godfatherButtons=<span>
        
        <div className='small-spacer'></div>

        <div className='menu-item'>
          <Link to={`/subordinates/${this.props.currentUser.id}`}><i className='icon ion-android-contacts'></i> Dolgozóim</Link>
        </div>
        <div className='menu-item'>
          <Link to={`/person_requests/${this.props.currentUser.id}`}><i className='icon ion-bag'></i> Hirdetések</Link>
        </div>
      </span>;
    }
    
    let usersButton;
    if(auth.canManageUsers(this.props.currentUser)){
      usersButton=<div className='menu-item'>
        <Link to='/users'><i className='icon ion-person-stalker'></i> Felhasználók</Link>
      </div>;
    }
    
    let searchButton;
    if(auth.canSearch(this.props.currentUser)){
      searchButton=<div className='menu-item'>
        <Link to='/query'><i className='icon ion-search'></i> Keresés</Link>
      </div>;
    }
    
    let recentButton;
    if(auth.canSeeAvailabilities(this.props.currentUser)){
      recentButton=<div className='menu-item'>
        <Link to='/'><i className='icon ion-android-calendar'></i> Friss hirdetések</Link>
      </div>;
    }
    
    return <div>
      <TodoBlock></TodoBlock>
      <div className='menu-item'>
        <Link to={`/competence_chooser/${this.props.currentUser.id}`}><i className='icon ion-trophy'></i> Kompetenciáim</Link>
      </div>
      {statsButton}
      {recentButton}
      {searchButton}
      {usersButton}
      {godfatherButtons}
      {competenceButtons}
    </div>;
  }
});
