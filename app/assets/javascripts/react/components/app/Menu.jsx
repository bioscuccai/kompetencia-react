"use strict";

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  render(){
    return <div>
      <div>
        <Link to='/users'>Felhasználók</Link>
      </div>
      <div>
        <Link to='/query'>Keresés</Link>
      </div>
      <div>
        <Link to='/competence_types'>Kompetenciák</Link>
      </div>
      <div>
        <Link to='/competence_tier_groups'>Válasz lehetőségek</Link>
      </div>
      <div>
        <Link to='/query'>Keresés</Link>
      </div>
      <div>
        <Link to={`/subordinates/${this.context.currentUser.id}`}>Dolgozóim</Link>
      </div>
    </div>;
  }
});
