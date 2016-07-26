'use strict';

import React from 'react';
import Modal from 'react-modal';

import NewPost from './NewPost.jsx';

import modalStyle from '../../styles/modal';

export default React.createClass({
  componentWillMount(){
    Modal.setAppElement("body");
  },
  getInitialState(){
    return {
      newModal: false
    };
  },
  
  onRequestCloseNew(){
    this.setState({
      newModal: false
    });
  },
  
  onNewModal(){
    this.setState({
      newModal: true
    });
  },
  
  render(){
    if(this.props.currentUser.is_admin){
      return <div>
        <button onClick={this.onNewModal}>Új post</button>
        
        <Modal isOpen={this.state.newModal}
          style={modalStyle}
          onRequestClose={this.onRequestCloseNew}>
          <NewPost onClose={this.onRequestCloseNew}></NewPost>
        </Modal>
      </div>;
    } else {
      return <span></span>;
    }
  }
});