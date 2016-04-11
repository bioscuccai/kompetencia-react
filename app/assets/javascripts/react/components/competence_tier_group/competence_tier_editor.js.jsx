import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions.js.jsx';

export default React.createClass({
  render(){
    return <div>
      <input ref='title' type='text' defaultValue={this.props.tier.title}></input>
      <button onClick={this.onSave}>Módosít</button>
      <button>Töröl</button>
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
