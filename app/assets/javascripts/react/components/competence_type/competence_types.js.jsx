"use strict";

import React from 'react';
import competenceTypeStore from '../../stores/competence_type_store.js.jsx';
import competenceTierStore from '../../stores/competence_tier_store.js.jsx';

import CompetenceType from './competence_type.js.jsx';
import NewCompetenceType from './new_competence_type.js.jsx';
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
      <button onClick={this.onNewModal}>Új...</button>
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
