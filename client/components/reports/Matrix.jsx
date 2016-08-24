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
    reportStore.fetchMatrix(this.props.params.reportId);
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
      reportStore.fetchMatrix(this.props.params.reportId, newCheckboxState);
    });
  },
  
  render(){
    if(!this.state.matrix){
      return <Loading></Loading>;
    }
    return <div>
      <div className='clearfix'>
        <h1 className='float-left'>Mátrix</h1>
        <a href={`/reports/${this.props.params.reportId}/matrix.csv`} className='button float-right'>
          <i className='icon ion-android-download'></i>
          Letöltés
        </a>
      </div>
      <ul>
        Csak az adott reporthoz tartozó mentett keresések kompetenciát jeleníti meg szintekre lebontva.
        Tehát a módosítók, mint például az erős keresés még nincs implementálva.
      </ul>
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
