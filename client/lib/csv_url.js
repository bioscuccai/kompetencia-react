'use strict';
import _ from 'lodash';

function build(url, elems){
  elems=Object.keys(elems).filter(e=>elems[e]);
  return `${url}?${elems.map(e=>`${_.snakeCase(e)}=1`).join('&')}`;
}

module.exports=build;
