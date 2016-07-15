'use strict';

import React from 'react';

export default React.createClass({
  render(){
    return <div className='todo-block'>
      <h5 className='row'>
        <div className='column column-10'>
          <i className="icon ion-document-text"></i>
        </div>
        <div className='column column-90 center'>
          Dokumentáció
        </div>
      </h5>
      <div>
        <ul>
          {this.props.docs.map(doc=>{
            return <li key={`doc-${doc.title}`}>
              <a href={doc.url} target='_blank'>
                {doc.title}
              </a>
            </li>;
          })}
        </ul>
      </div>
    </div>;
  }
});
