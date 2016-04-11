import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions.js.jsx';

export default React.createClass({
  render(){
    return <div className='row'>
      <div className='column column-50'>
        <input ref='title' type='text' defaultValue={this.props.tier.title}></input>
      </div>
      <div className='column column-50'>
        <button onClick={this.onSave}>Módosít</button>
        <button>Töröl</button>
      </div>
    </div>;
  },
  
  onSave(e){
    e.preventDefault();
    competenceTierActions.updateTier(this.props.tier.id, this.refs.title.value, this.props.tier.level);
  },
  
  onDelete(e){
    e.preventDefault();
    competenceTierActions.deleteTier(this.props.tier.id);
  }
});
