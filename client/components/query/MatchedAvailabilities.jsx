import React from 'react';

import DateLabel from '../date/DateLabel.jsx';

export default React.createClass({
  render(){
    let tag;
    if(this.props.matchedAvailabilities.length!==0){
      tag=<div>
        {this.props.matchedAvailabilities.map(matchedAvailability=>{
          return <span className='matched-availability' key={`avail-${matchedAvailability.id}`}>
            <i className='icon ion-android-time'></i>
            <DateLabel date={matchedAvailability.starts_at}></DateLabel> &mdash; <DateLabel date={matchedAvailability.ends_at}></DateLabel>
            ({matchedAvailability.work_hours} óra)
          </span>;
        })}
      </div>;
    } else {
      tag=<div></div>;
    }
    return tag;
  }
});
