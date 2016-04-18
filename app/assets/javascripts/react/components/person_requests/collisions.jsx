"use strict";

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <h1>Kérés elfogadása</h1>
      <div>
        A következő hírdetések érintettek:
        <ul>
          {this.props.collisions.map(coll=>{
            return <li key={`coll-${coll.id}`}>
              {coll.starts_at} / {coll.ends_at}
            </li>;
          })}
        </ul>
      </div>
      <div>
        <button><i className='icon ion-checkmark'></i> Elfogadás + hírdetések kikapcsolása</button>
        <button><i className='icon ion-checkmark'></i> Elfogadás + hírdetések kinthagyása</button>
        <button><i className='icon ion-close'></i> Mégsem</button>
      </div>
    </div>;
  }
});
