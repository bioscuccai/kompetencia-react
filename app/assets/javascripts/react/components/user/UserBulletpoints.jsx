"use strict";

import React from 'react';
import CompetenceBreadcrumb from './CompetenceBreadcrumb.jsx';
import _ from 'lodash';
import {Link} from 'react-router';

export default React.createClass({
  render(){
    let godfather;
    if(this.props.user.godfather){
      godfather=<span>
        <img src='/godfather.gif' className='godfather-icon'></img>
        <a href={`/users/${this.props.user.godfather.id}`}>
          {this.props.user.godfather.email}
        </a>
      </span>;
    }
    
    let available;
    if(this.props.user.available){
      available=<span className='available-label'>Rendelkezésre áll</span>;
    }
    return <span>
      <div className='user-name'>
        <Link to={`/users/${this.props.user.id}`}>
          <div>{this.props.user.name}</div>
          <div>
            {this.props.user.email}
          </div>
        </Link>
      </div>
      <div>
        {available}
      </div>
      <div>
        {godfather}
      </div>
      <div>
        <small>
          {this.props.user.competences.map(competence=>{
            return <CompetenceBreadcrumb
              key={`subordinate-mini-competence-${this.props.user.id}-${competence.id}`}
              competence={competence}
              highlight={_.get(this.props, "highlightedIds", []).indexOf(competence.id)!==-1}
              ></CompetenceBreadcrumb>;
          })}
        </small>
      </div>
    </span>;
  }
});
