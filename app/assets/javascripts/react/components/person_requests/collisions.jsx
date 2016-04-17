"use strict";

import React from 'react';

export default React.createClass({
  render(){
    return <div>
      <div>
        A következő időpontok
        {this.props.collisions.map(coll=>{
          return <div>
            {coll.starts_at} / {coll.ends_at}
          </div>;
        })};
      </div>
    </div>;
  }
});
