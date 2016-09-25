'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import alt from '../../alt/alt';
import Loading from '../Loading.jsx';
import MatrixCompetenceType from './MatrixCompetenceType.jsx';
import csvUrl from '../../lib/csv_url';

export default React.createClass({
  getInitialState(){
    return {
      matrix: null,
      onlySubordinates: true,
      addCompetences: false
    };
  },
  
  componentDidMount(){
    alt.recycle(reportStore);
    reportStore.listen(this.handleReportStoreChange);
    reportStore.fetchGlobalMatrix(true);
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
    <div className="clearfix">
      <h1 className='float-left'>Mátrix</h1>
      <a href={csvUrl(`/reports/global_matrix.csv`, {
          onlySubordinates: this.state.onlySubordinates,
          addCompetences: this.state.addCompetences
        }) } className='button float-right'>
        <i className='icon ion-android-download'></i>
          Letöltés
      </a>
    </div>
      <div>
        <input type='checkbox'
          onChange={this.onOnlySubordinatesChange}
          checked={this.state.onlySubordinates}/> Csak saját dolgozók
      </div>
      <div>
        <input type="checkbox" checked={this.state.addCompetences}
        onChange={(e)=>this.setState({
          addCompetences: e.target.checked
        })}/>  Függő és konfirmált kompetenciák összevonása
      </div>
      {this.state.matrix.map(compType=>{
        console.log(compType);
        return <MatrixCompetenceType
          addCompetences={this.state.addCompetences}
          key={`mat-comp-${compType.id}`}
          competenceType={compType}
          ></MatrixCompetenceType>;
      })}
    </div>;
  }
});
