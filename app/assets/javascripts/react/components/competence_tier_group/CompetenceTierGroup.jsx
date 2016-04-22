"use strict";

import React from 'react';
import competenceTierActions from '../../actions/competence_tier_actions';

import NewCompetenceTier from './NewCompetenceTier.jsx';
import CompetenceTierEditor from './CompetenceTierEditor.jsx';
import CompetenceTierGroupEditor from './CompetenceTierGroupEditor.jsx';
import CompetenceTierLabel from './CompetenceTierLabel.jsx';

import Modal from 'react-modal';
import modalStyle from '../../styles/modal';

export default React.createClass({
  getInitialState(){
    return {newModal: false};
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  render(){
    let title;
    if(this.props.group.selected){
      title=<CompetenceTierGroupEditor group={this.props.group}></CompetenceTierGroupEditor>;
    } else {
      title=<h3 onClick={this.onClick}>{this.props.group.title}</h3>;
    }
    return <div>
      {title}
      <blockquote>
        <table>
          <thead>
            <tr>
              <th>
                Szint
              </th>
              <th>
                Megnevezés
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.group.tiers.map(tier=>{
              let label;
              if(tier.selected){
                label=<CompetenceTierEditor tier={tier}></CompetenceTierEditor>;
              } else {
                label=<CompetenceTierLabel tier={tier}></CompetenceTierLabel>;
              }
              return <tr key={tier.title}><td>{tier.level}</td><td>
                {label}
              </td></tr>;
            })}
          </tbody>
        </table>
        <button onClick={this.onNewModal}><i className='icon ion-plus'></i>Új válaszlehetőség...</button>
        <Modal
          onRequestClose={this.onRequestClose}
          isOpen={this.state.newModal}
          style={modalStyle}>
          <NewCompetenceTier group={this.props.group}></NewCompetenceTier>
          <button onClick={this.onRequestClose}>Bezár</button>
        </Modal>
      </blockquote>
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
  
  onClick(){
    competenceTierActions.selectTierGroup(this.props.group.id);
  }
});
