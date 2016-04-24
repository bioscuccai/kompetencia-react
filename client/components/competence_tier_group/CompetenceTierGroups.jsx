"use strict";

import React from 'react';
import alt from '../../alt/alt';
import competenceTierStore from '../../stores/competence_tier_store';

import CompetenceTierGroup from './CompetenceTierGroup.jsx';
import NewCompetenceTierGroup from './NewCompetenceTierGroup.jsx';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';


export default React.createClass({
  getInitialState(){
    return {
      competenceTierGroups: [],
      newModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  componentDidMount(){
    alt.recycle(competenceTierStore);
    competenceTierStore.listen(this.handleStoreChange);
    competenceTierStore.fetchCompetenceTiers();
  },
  
  componentWillUnmount(){
    competenceTierStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    return <div>
      <h1>Válasz sablonok</h1>
      {this.state.competenceTierGroups.map(group=>{
        return <CompetenceTierGroup group={group} key={group.id}></CompetenceTierGroup>;
      })}
      <button onClick={this.onNewModal}><i className='icon ion-plus'></i>Új kérdés sablon...</button>
      <Modal
        isOpen={this.state.newModal}
        style={modalStyle}
        onRequestClose={this.onRequestClose}>
        <NewCompetenceTierGroup closeModal={this.onRequestClose}></NewCompetenceTierGroup>
      </Modal>
    </div>;
  },
  
  handleStoreChange(){
    this.setState({
      competenceTierGroups: competenceTierStore.getState().competenceTierGroups
    });
  },
  
  onNewModal(){
    this.setState({
      newModal: true
    });
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  }
});
