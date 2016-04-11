import React from 'react';


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
        <a href={`/users/${this.props.user.id}`}>{this.props.user.email}</a>
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
            return <span
                key={`subordinate-mini-competence-${this.props.user.id}-${competence.id}`}
                className='mini-competence'>
                  {competence.title} ({competence.level})
                </span>;
          })}
        </small>
      </div>
    </span>;
  }
});
