"use strict";

import React from 'react';
import NewCompetence from './NewCompetence.jsx';
import CompetenceMember from './CompetenceMember.jsx';
import _ from 'lodash';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

export default React.createClass({
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  render(){
    return <div>
      <h5>{this.props.competenceType.title} ({_.get(this.props.competenceType, "competence_tier_group.title")})</h5>
      <blockquote>
        {this.props.competenceType.competences.map(competence=>{
          return <CompetenceMember competence={competence}
            key={`competence-${this.props.competenceType.id}-${competence.id}`}></CompetenceMember>;
        })}
      </blockquote>
      <button onClick={this.onNewModal}>Új...</button>
      <Modal
        style={modalStyle}
        onRequestClose={this.onRequestClose}
        isOpen={this.state.newModal}>
        <NewCompetence competenceType={this.props.competenceType}></NewCompetence>
        <button onClick={this.onRequestClose}>Bezár</button>
      </Modal>
    </div>;
  },
  
  onRequestClose(){
    this.setState({
      newModal: false
    });
  },
  
  onNewModal(){
    this.setState({
      newModal: true
    });
  }
});
