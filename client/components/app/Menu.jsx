"use strict";

import React from 'react';
import {Link} from 'react-router';
import auth from '../../lib/auth';
import TodoBlock from '../todos/TodoBlock.jsx';
import Docs from './menu/Docs.jsx';

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
    
    if(this.props.currentUser.is_admin || this.props.currentUser.is_godfather){
      statsButton=<div className='menu-item'>
          <Link to='/stats'>
            <i className='icon ion-calculator'></i> Statisztikák
          </Link>
        </div>;
    }
    
    let reportButton;
    if(this.props.currentUser.is_admin || this.props.currentUser.is_godfather){
      reportButton=<span>
        <div className='menu-item'>
          <Link to='/reports'>
            <i className='icon ion-document-text'></i> Report
          </Link>
        </div>
        <div className='menu-item'>
          <Link to='/saved_queries'>
            <i className='icon ion-funnel'></i> Mentett keresés
          </Link>
        </div>
        <div className='menu-item'>
          <Link to='/global_matrix'>
            <i className='icon ion-ios-grid-view'></i> Teljes mátrix
          </Link>
        </div>
      </span>;
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

    let emailButton;
    if(this.props.currentUser.is_admin){
      emailButton=<div className='menu-item'>
        <Link to='/email_dummies'><i className='icon ion-email'></i> E-mailek</Link>
      </div>;
    }

    let mentorGuide;
    if(this.props.currentUser.is_godfather || this.props.currentUser.is_admin){
      
    }
    
    return <div>
      <TodoBlock></TodoBlock>
      <div className='menu-item'>
        <Link to={`/competence_chooser/${this.props.currentUser.id}`}><i className='icon ion-trophy'></i> Kompetenciáim</Link>
      </div>
      
      {statsButton}
      {reportButton}
      {recentButton}
      {searchButton}
      {usersButton}
      {godfatherButtons}
      {competenceButtons}
      {emailButton}
      <div className='menu-item'>
        <Link to={`/posts`}><i className='icon ion-ios-information-outline'></i> Bejelentések</Link>
      </div>
      <Docs currentUser={this.props.currentUser} docs={this.props.docs}></Docs>
    </div>;
  }
});
