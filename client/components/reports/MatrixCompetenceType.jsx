'use strict';

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <h2>{this.props.competenceType.competence_type}</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {this.props.competenceType.tiers.map(tier=>{
              return <th key={`cth-${this.props.competenceType.id}-${tier.level}`}>{tier.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.competenceType.competences.map(comp=>{
            return <tr key={`comp-${comp.id}`}>
              <td>{comp.title}</td>
              {comp.levels.map((cl,i )=>{
                return <th key={`cl-${comp.id}-${i}`}>
                  {cl.assigned}&nbsp;
                  /&nbsp;
                  <span
                    className='pending-user-competence'
                    title='Megerősítetlen'>
                    {cl.pending}
                  </span>
                </th>;
              })}
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }
});
