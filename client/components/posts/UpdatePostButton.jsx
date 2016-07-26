'use strict';

import React from 'react';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import UpdatePost from './UpdatePost.jsx';

export default React.createClass({
  getInitialState(){
    return {
      updateOpen: false
    };
  },
  
  onRequestCloseUpdate(){
    this.setState({
      updateOpen: false
    });
  },
  
  onUpdateOpen(){
    this.setState({
      updateOpen: true
    });
  },
  
  render(){
    if(!this.props.currentUser.is_admin){
      return <span></span>;
    }
    return <span>
      <button onClick={this.onUpdateOpen}>Módosítás</button>
      <Modal
        style={modalStyle}
        isOpen={this.state.updateOpen}
        onRequestClose={this.onRequestCloseUpdate}>
        <UpdatePost onClose={this.onRequestCloseUpdate} postId={this.props.post.id}></UpdatePost>
      </Modal>
    </span>;
  }
});
