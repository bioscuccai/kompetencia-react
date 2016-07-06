'use strict';

import React from 'react';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import NewSavedQuery from '../reports/NewSavedQuery.jsx';

export default React.createClass({
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  onNewModal(){
    this.setState({newModal: true});
  },
  
  onRequestClose(){
    this.setState({newModal: false});
  },
  
  render(){
    if(this.props.currentUser.is_admin){
      return <span>
        <button onClick={this.onNewModal}>
          <i className='icon ion-plus-round'></i>
          Keresés mentése
        </button>
        <Modal
          isOpen={this.state.newModal}
          onRequestClose={this.onRequestClose}
          style={modalStyle}>
          <NewSavedQuery
            onClose={this.onRequestClose}
            competences={this.props.competences}></NewSavedQuery>
        </Modal>
      </span>;
    } else {
      return <span></span>;
    }
  }
});
