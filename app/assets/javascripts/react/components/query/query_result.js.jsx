import React from 'react';
import UserBulletPoints from '../subordinates/user_bulletpoints.js.jsx';

/*
export default React.createClass({
  render(){
    return <div className='result-box'>
      <h6>
        <a href={`/users/${this.props.result.id}`}>
          {this.props.result.email}
        </a>
      </h6>
      <small>
        {this.props.result.found.map(found=>{
          return <span
              key={`result-competence-${this.props.result.id}-${found.competence_id}`}
              className='result-competence'>
            {found.title} ({found.level})
          </span>;
        })}
      </small>
    </div>;
  }
});
*/
export default React.createClass({
  render(){
    return <div className='result-box'>
      <div>
        <UserBulletPoints user={this.props.result}></UserBulletPoints>
      </div>
      <div>
        {this.props.result.found.map(found=>{
          return <span
              key={`result-competence-${this.props.result.id}-${found.competence_id}`}
              className='result-competence'>
            {found.title} ({found.level})
          </span>;
        })}
      </div>
    </div>;
  }
});