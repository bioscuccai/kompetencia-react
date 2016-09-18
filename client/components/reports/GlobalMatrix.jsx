'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import alt from '../../alt/alt';
import Loading from '../Loading.jsx';
import MatrixCompetenceType from './MatrixCompetenceType.jsx';

export default React.createClass({
  getInitialState(){
    return {
      matrix: null,
      onlySubordinates: false
    };
  },
  
  componentDidMount(){
    alt.recycle(reportStore);
    reportStore.listen(this.handleReportStoreChange);
    reportStore.fetchGlobalMatrix(false);
  },
  
  componentWillUnmount(){
    reportStore.unlisten(this.handleReportStoreChange);
  },
  
  handleReportStoreChange(state){
    console.log(state.matrix);
    this.setState({
      matrix: state.matrix
    });
  },
  
  onOnlySubordinatesChange(e){
    let newCheckboxState=e.target.checked;
    this.setState({
      onlySubordinates: newCheckboxState
    }, ()=>{
      reportStore.fetchGlobalMatrix(newCheckboxState);
    });
  },
  
  render(){
    if(!this.state.matrix){
      return <Loading></Loading>;
    }
    return <div>
      <h1>Mátrix</h1>
      <div>
        <input type='checkbox'
          onChange={this.onOnlySubordinatesChange}
          checked={this.state.onlySubordinates}></input> Csak saját dolgozók
      </div>
      {this.state.matrix.map(compType=>{
        console.log(compType);
        return <MatrixCompetenceType
          key={`mat-comp-${compType.id}`}
          competenceType={compType}
          ></MatrixCompetenceType>;
      })}
    </div>;
  }
});
