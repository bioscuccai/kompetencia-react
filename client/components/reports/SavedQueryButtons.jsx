'use strict';

import React from 'react';
import reportActions from '../../actions/report_actions';
import auth from '../../lib/auth';
import Modal from 'react-modal';
import modalStyle from '../../styles/modal';
import UpdateSavedQuery from './UpdateSavedQuery.jsx';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  componentWillMount(){
    Modal.setAppElement("body");
  },
  
  getInitialState(){
    return {
      updateModal: false
    };
  },
  
  onUpdate(){
    this.setState({updateModal: true});
  },
  
  onDelete(e){
    e.preventDefault();
    reportActions.deleteSavedQuery(this.props.savedQuery.id)
    .then(data=>{
      if(_.get(data, "data.status")==="ok"){
        NotificationManager.info("Törölve");
      }else{
        NotificationManager.error("Hiba");
      }
    })
    .catch(e=>{
      NotificationManager.error("Hiba");
    });
  },
  
  onRequestCloseUpdate(){
    this.setState({updateModal: false});
  },
  
  render(){
    return <span>
      <button onClick={this.onUpdate}>
        <i className='icon ion-compose'></i>
      </button>
      <Modal
        isOpen={this.state.updateModal}
        style={modalStyle}
        onRequestClose={this.onRequestCloseUpdate}>
        <UpdateSavedQuery
          savedQuery={this.props.savedQuery}
          onClose={this.onRequestCloseUpdate}>
        </UpdateSavedQuery>
      </Modal>
      <button onClick={this.onDelete}>
        <i className='icon ion-trash-a'></i>
      </button>
    </span>;
  }
});
