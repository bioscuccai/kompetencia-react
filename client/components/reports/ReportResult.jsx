'use strict';

import React from 'react';

export default React.createClass({
  render(){
    return <tr>
      <td>
        {this.props.result.name}
      </td>
      <td>
        {this.props.result.value}
      </td>
    </tr>;
  }
});
