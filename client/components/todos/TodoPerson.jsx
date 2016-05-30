"use strict";

import {hashHistory} from 'react-router';
import {Link} from 'react-router';
import React from 'react';
import todoActions from '../../actions/todo_actions';

export default React.createClass({
  render(){
    return <div>
      <Link to={`/competence_chooser/${this.props.todo.id}`}>
        <i className='icon ion-ios-pricetag'></i> {this.props.todo.name}
      </Link>
    </div>;
  }
});
