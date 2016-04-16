"use strict";

import React from 'react';
import requestStore from '../../stores/request_store';

import RequestItem from './request_item.js.jsx';
import RelevantItem from './relevant_item.js.jsx';

export default React.createClass({
  getInitialState(){
    return {
      requested: [],
      relevant: []
    };
  },
  
  componentDidMount(){
    requestStore.listen(this.handleStoreChange);
    requestStore.fetchRequested(this.props.user.id);
    requestStore.fetchRelevant(this.props.user.id);
  },
  
  componentWillUnmount(){
    requestStore.unlisten(this.handleStoreChange);
  },
  
  render(){
    return <div>
      <h1>Kérések</h1>
      <h3>Kérvényezett</h3>
      <table>
        <thead>
          <tr>
            <td>Név</td>
            <td>Munka</td>
            <td>Időtartam</td>
            <td>Állapot</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.state.requested.map(req=>{
            return <RequestItem
              key={`request-${req.id}`}
              request={req}></RequestItem>;
          })}
        </tbody>
      </table>
      <h3>Kérvények</h3>
      <table>
        <thead>
          <tr>
            <td>Név</td>
            <td>Kérvényező</td>
            <td>Munka</td>
            <td>Időtartam</td>
            <td>Állapot</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.state.relevant.map(request=>{
            return <RelevantItem
              key={`relevant-${request.id}`}
              request={request}></RelevantItem>;
          })}
        </tbody>
      </table>
    </div>;
  },
  
  handleStoreChange(state){
    console.log("relevant:");
    console.log(state.relevant);
    this.setState({
      relevant: state.relevant,
      requested: state.requested
    });
  }
});
