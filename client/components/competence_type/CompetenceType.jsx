"use strict";

import React from 'react';
import NewCompetence from './NewCompetence.jsx';
import CompetenceMember from './CompetenceMember.jsx';
import CompetenceMemberEditor from './CompetenceMemberEditor.jsx';
import CompetenceTypeEditor from './CompetenceTypeEditor.jsx';

import _ from 'lodash';

import competenceTypeActions from '../../actions/competence_type_actions';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

export default React.createClass({
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  render(){
    let header;
    if(this.props.competenceType.selected){
      header=<CompetenceTypeEditor competenceType={this.props.competenceType}></CompetenceTypeEditor>;
    } else {
      header=<h5 onClick={this.onSelect}>{this.props.competenceType.title} ({_.get(this.props.competenceType, "competence_tier_group.title")})</h5>;
    }
    return <div>
      {header}
      <blockquote>
        {this.props.competenceType.competences.map(competence=>{
          let comp;
          if(competence.selected){
            comp=<CompetenceMemberEditor
              key={`competence-editor-${this.props.competenceType.id}-${competence.id}`}
              competence={competence}></CompetenceMemberEditor>;
          } else {
            comp=<CompetenceMember competence={competence}
              key={`competence-${this.props.competenceType.id}-${competence.id}`}></CompetenceMember>;
          }
          return comp;
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
  },
  
  onSelect(){
    competenceTypeActions.selectType(this.props.competenceType.id);
  }
});
