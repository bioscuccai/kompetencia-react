import React from 'react';
import competenceTypeActions from '../../actions/competence_type_actions.js.jsx';

export default React.createClass({
  render(){
    return <div>
      <h2>Új kompetencia kategória</h2>
      <form onSubmit={this.onFormSubmit}>
        <input type='text' ref='title' placeholder='Megnevezés'/>
        <select ref='tierGroup'>
          {this.props.competenceTierGroups.map(tierGroup=>{
            return <option value={tierGroup.id}>{tierGroup.title}</option>;
          })}
        </select>
        <div>
          <small>
            <a href='/competence_tier_groups'>
              Kérdés sablonok &raquo;
            </a>
          </small>
        </div>
        <input type='submit' value='Új kompetencia kategória'/>
      </form>
    </div>;
  },
  
  onFormSubmit(e){
    e.preventDefault();
    competenceTypeActions.createCompetenceType(this.refs.title.value, this.refs.tierGroup.value);
  }
});
