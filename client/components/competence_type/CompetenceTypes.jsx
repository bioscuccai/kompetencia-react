"use strict";

import React from 'react';
import alt from '../../alt/alt';
import competenceTypeStore from '../../stores/competence_type_store';
import competenceTierStore from '../../stores/competence_tier_store';

import CompetenceType from './CompetenceType.jsx';
import NewCompetenceType from './NewCompetenceType.jsx';

import Modal from 'react-modal';

export default React.createClass({
  getInitialState(){
    return {
      competenceTypes: [],
      competenceTierGroups: [],
      newModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  componentDidMount(){
    alt.recycle(competenceTierStore, competenceTypeStore);
    competenceTypeStore.listen(this.handleCompetenceTypeStoreChange);
    competenceTierStore.listen(this.handleCompetenceTierStoreChange);
    competenceTierStore.fetchCompetenceTiers();
    competenceTypeStore.fetchCompetenceTypes();
  },
  
  componentWillUnmount(){
    competenceTypeStore.unlisten(this.handleCompetenceTypeStoreChange);
    competenceTierStore.unlisten(this.handleCompetenceTierStoreChange);
  },
  
  render(){
    return <div>
      <h1>Kompetenciák</h1>
      {this.state.competenceTypes.map(competenceType=>{
        return <CompetenceType competenceType={competenceType} key={`comp-type-${competenceType.id}`}></CompetenceType>;
      })}
      <button onClick={this.onNewModal}>Új kérdés...</button>
      <Modal
        onRequestClose={this.onRequestClose}
        isOpen={this.state.newModal}
        style={this.modalStyle}>
        <NewCompetenceType
          competenceTierGroups={this.state.competenceTierGroups}
          closeModal={this.onRequestClose}
          ></NewCompetenceType>
      </Modal>
    </div>;
  },
  
  handleCompetenceTypeStoreChange(){
    this.setState({
      competenceTypes: competenceTypeStore.getState().competenceTypes
    });
  },
  
  handleCompetenceTierStoreChange(){
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
