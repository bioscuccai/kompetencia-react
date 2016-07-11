'use strict';

import reportActions from '../../actions/report_actions';
import React from 'react';
import {NotificationManager} from 'react-notifications';
import Modal from 'react-modal';

import modalStyle from '../../styles/modal';
import UpdateReport from './UpdateReport.jsx';

export default React.createClass({
  getInitialState(){
    return {
      updateModal: false
    };
  },
  
  render(){
    return <div>
      <div>
        <button onClick={this.onDelete}>
          <i className='icon ion-trash-a'></i>
        </button>
      </div>
      <div>
        <button onClick={this.onUpdate}>
          <i className='icon ion-compose'></i>
        </button>
        <Modal
          style={modalStyle}
          isOpen={this.state.updateModal}
          onRequestClose={this.onRequestCloseUpdate}>
          <UpdateReport
            report={this.props.report}
            onClose={this.onRequestCloseUpdate}
            savedQueries={this.props.savedQueries}>
          </UpdateReport>
        </Modal>
      </div>
    </div>;
  },
  
  onDelete(){
    reportActions.deleteReport(this.props.report.id)
    .then(data=>{
      NotificationManager.info("Report törölve");
      return data;
    });
  },
  
  onUpdate(){
    this.setState({updateModal: true});
  },
  
  onRequestCloseUpdate(){
    this.setState({updateModal: false});
  }
});
