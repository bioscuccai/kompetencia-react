'use strict';

import _ from 'lodash';

function sorted(items, order, asc){
  return _.orderBy(items, [item=>{
    if(_.isString(item[order])){
      return _.deburr(item[order].toLowerCase());
    }
    return item[order];
  }], [asc ? 'asc' : 'desc']);
}

export default {
  sorted
};