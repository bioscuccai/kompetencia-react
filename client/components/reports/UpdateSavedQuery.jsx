'use strict';

import React from 'react';
import {NotificationManager} from 'react-notifications';
import reportActions from '../../actions/report_actions';
import _ from 'lodash';
import CloseButton from '../CloseButton.jsx';

export default React.createClass({
  getInitialState(){
    return {
      matchAll: false,
      showPending: false,
      onlySubordinates: false,
      unpublished: false
    };
  },
  
  componentDidMount(){
    this.setState({
      matchAll: this.props.savedQuery.match_all,
      showPending: this.props.savedQuery.show_pending,
      onlySubordinates: this.props.savedQuery.only_subordinates,
      unpublished: this.props.savedQuery.unpublished
    }, ()=>{
      console.log(this.state);
    });
  },
  
  render(){
    return <div>
      <div className='clearfix modal-title'>
        <div className='float-left'>
          <h1>
            Mentett keresés módosítás
          </h1>
        </div>
        <div className='float-right'>
          <CloseButton onClose={this.onClose}></CloseButton>
        </div>
      </div>
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
      <div>
        Csak a dolgozóim
        <input type='checkbox' onChange={this.onOnlySubordinatesChange} checked={this.state.onlySubordinates}></input>
      </div>
      <div>
        Csak én láthatom
        <input type='checkbox' onChange={this.onUnpublishedChange} checked={this.state.unpublished}></input>
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
  
  onOnlySubordinatesChange(e){
    this.setState({onlySubordinates: e.target.checked});
  },
  
  onUnpublishedChange(e){
    this.setState({unpublished: e.target.checked});
  },
  
  onUpdate(){
    reportActions.updateSavedQuery(this.props.savedQuery.id, this.refs.name.value,
      this.state.matchAll, this.state.showPending, this.state.onlySubordinates, this.state.unpublished)
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
  },
  
  onClose(){
    if(this.props.onClose) this.props.onClose();
  }
});
