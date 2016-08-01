'use strict';

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <table>
        <thead>
          <tr>
            <th className='max-width-250'></th>
            <th>{this.props.competence.title}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.competence.levels.map(level=>{
            return <tr key={`comp-level-${this.props.competence.title}-${level.title}`}>
              <td>
                {level.title}
              </td>
              <td>
                {level.assigned}&nbsp;
                /&nbsp;
                <span
                  className='pending-user-competence'
                  title='Megerősítetlen'>
                  {level.pending}
                </span>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }
});
