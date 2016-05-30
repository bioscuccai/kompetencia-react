"use strict";

import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

export default React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },
  
  render(){
    let reqIcon=classnames({
      icon: true,
      'ion-arrow-right-a': (this.props.todo.type==='relevant'),
      'ion-arrow-left-a': (this.props.todo.type==='requested')
    });
    return <div>
      <Link to={`/person_requests/${this.context.currentUser.id}`}>
        <i className={reqIcon}></i> {this.props.todo.title}
      </Link>
    </div>;
  }
});
