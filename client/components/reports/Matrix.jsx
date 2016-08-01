'use strict';

import React from 'react';
import reportStore from '../../stores/report_store';
import alt from '../../alt/alt';
import Loading from '../Loading.jsx';
import MatrixCompetence from './MatrixCompetence.jsx';

export default React.createClass({
  getInitialState(){
    return {
      matrix: null
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
    this.setState({
      matrix: state.matrix
    });
  },
  
  render(){
    if(!this.state.matrix){
      return <Loading></Loading>;
    }
    return <div>
      <h1>Mátrix</h1>
      <ul>
        Csak az adott reporthoz tartozó mentett keresések kompetenciát jeleníti meg szintekre lebontva.
        Tehát a módosítók, mint például az erős keresés és a saját dolgozókra szűrés még nincs implementálva.
      </ul>
      {this.state.matrix.map(comp=>{
        return <MatrixCompetence
          key={`mat-comp-${comp.title}`}
          competence={comp}
          ></MatrixCompetence>;
      })}
    </div>;
  }
});
