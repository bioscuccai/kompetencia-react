import React from 'react';
import UserBulletpoints from './UserBulletpoints.jsx';
import userStore from '../../stores/user_store';
import Availability from '../availabilites/Availability.jsx';


export default React.createClass({
  getInitialState(){
    return {
      profileAvailabilities: []
    };
  },
  
  componentDidMount(){
    userStore.listen(this.handleUserStoreChange);
    userStore.fetchProfileAvailabilities(this.props.profileUser.id);
  },
  
  componentWillUnmount(){
    userStore.unlisten(this.handleUserStoreChange);
  },
  
  handleUserStoreChange(state){
    this.setState({
      profileAvailabilities: state.profileAvailabilities
    });
  },
  
  render(){
    let availabilityMarker;
    if(this.props.profileUser.available){
      availabilityMarker=<h3 className='available-label'>A felhasználó ELÉRHETŐ</h3>;
    } else {
      availabilityMarker=<h3>A felhasználó most foglalt</h3>;
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
            return <li key={`competence-${competence.id}`}>{competence.title} <small>({competence.level_title})</small></li>;
          })}
        </ul>
      </div>
      
      {availabilityMarker}

      <table>
        <thead>
          <tr>
            <th>
              Kezdés
            </th>
            <th>
              Befejezés
            </th>
            <th>
              Komment
            </th>
            <th>
              <i className='icon ion-calendar'></i>
            </th>
            <th>
              
            </th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.profileAvailabilities.map(pa=>{
              return <Availability
                key={`availability-${pa.id}`}
                availability={pa}
                profileUser={this.props.profileUser}
                hideButtons={true}></Availability>;
            })
          }
        </tbody>
        
      </table>
      
      {subordinateMarker}
    </div>;
  }
});