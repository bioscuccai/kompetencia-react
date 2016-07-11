'use strict';

import React from 'react';
import {NotificationManager} from 'react-notifications';
import reportActions from '../../actions/report_actions';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      matchAll: false,
      showPending: false
    };
  },
  
  componentDidMount(){
    this.setState({
      matchAll: this.props.savedQuery.match_all,
      showPending: this.props.savedQuery.show_pending
    }, ()=>{
      console.log(this.state);
    });
  },
  
  render(){
    return <div>
      Név:
      <input type='text' ref='name' defaultValue={this.props.savedQuery.name}></input>
      <div>
        Pontos találat:
        <input type='checkbox' onChange={this.onMatchAllChange} checked={this.state.matchAll}></input>
      </div>
      <div>
        Függő kompetenciák
        <input type='checkbox' onChange={this.onShowPendingChange} checked={this.state.showPending}></input>
      </div>
      <button onClick={this.onUpdate}>Mentés</button>
    </div>;
  },
  
  onMatchAllChange(e){
    this.setState({matchAll: e.target.checked});
  },
  
  onShowPendingChange(e){
    this.setState({showPending: e.target.checked});
  },
  
  onUpdate(){
    reportActions.updateSavedQuery(this.props.savedQuery.id, this.refs.name.value,
      this.state.matchAll, this.state.showPending)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Sikeres módosítás");
      } else {
        NotificationManager.error("Hiba");
      }
    })
    .catch(e=>{
      NotificationManager.error("Hiba");
    });
    if(this.props.onClose){
      this.props.onClose();
    }
  }
});
