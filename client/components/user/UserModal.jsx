import React from 'react';
import UserBulletpoints from './UserBulletpoints.jsx';

export default React.createClass({
  render(){
    let availabilityMarker;
    if(this.props.profileUser.available){
      availabilityMarker=<h3 className='available-label'>A felhasználó ELÉRHETŐ</h3>;
    } else {
      availabilityMarker=<h3>A felhasználó foglalt</h3>;
    }
    
    let subordinates=this.props.allUsers.filter(e=>e.godfather_id===this.props.profileUser.id);
    
    let subordinateMarker;
    if(this.props.profileUser.is_godfather){
      subordinateMarker=<div>
        <h3>A felhasználó mentor</h3>
        <div>A dolgozói: </div>
        {subordinates.map(user=>{
          return <div className='profile-item' key={`subordinate-${user.id}`}>
              <UserBulletpoints user={user}></UserBulletpoints>
            </div>;
        })}
      </div>;
    }
    
    return <div>
      <h1>{this.props.profileUser.name} <small>{this.props.profileUser.email}</small></h1>
      
      <div>
        <h3>Kompetenciák</h3>
        <ul>
          {this.props.profileUser.competences.map(competence=>{
            return <li key={`competence-${competence.id}`}>{competence.title} <small>({competence.level})</small></li>;
          })}
        </ul>
      </div>
      
      {availabilityMarker}
      
      {subordinateMarker}
    </div>;
  }
});