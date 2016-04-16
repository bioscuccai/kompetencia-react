"use strict";

import React from 'react';
import competenceTierStore from '../../stores/competence_tier_store.js.jsx';

import CompetenceTierGroup from './competence_tier_group.js.jsx';
import NewCompetenceTierGroup from './new_competence_tier_group.js.jsx';
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
      <button onClick={this.onNewModal}>Új...</button>
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
