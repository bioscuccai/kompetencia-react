'use strict';
import React from 'react';
export default React.createClass({
  render(){
    if(this.props.addCompetences){
      return <span>
        {this.props.competence.assigned + this.props.competence.pending}</span>;
    } else {
      return <span>
        {this.props.competence.assigned}&nbsp;
        /&nbsp;
        <span
          className='pending-user-competence'
          title='Megerősítetlen'>
          {this.props.competence.pending}
        </span>
      </span>;
    }
  }
});
