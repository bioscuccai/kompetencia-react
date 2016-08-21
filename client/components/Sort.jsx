'use strict';

import React from 'react';

export default React.createClass({
  getInitialState(){
    return {
      selectedValue: null,
      asc: true
    };
  },
  
  componentDidMount(){
    this.setState({
      selectedValue: this.props.fields[this.props.initialIndex || 0].value,
      asc: !!this.props.initialDirection
    });
  },
  
  onSelectionChange(e){
    let value=e.target.value;
    this.setState({
      selectedValue: value
    }, ()=>{
      this.callCallback();
    });
  },
  
  onChevronUp(e){
    e.preventDefault();
    this.setState({asc: false}, ()=>{
      this.callCallback();
    });
  },
  
  onChevronDown(e){
    e.preventDefault();
    this.setState({asc: true}, ()=>{
      this.callCallback();
    });
  },
  
  callCallback(){
    if(this.props.onChange){
      this.props.onChange(this.state.selectedValue, this.state.asc);
    }
  },
  
  render(){
    let chevron;
    if(this.state.asc){
      chevron=<a href='#' onClick={this.onChevronUp}>
        <i className='icon ion-chevron-down'></i>
      </a>;
    } else {
      chevron=<a href='#' onClick={this.onChevronDown}>
        <i className='icon ion-chevron-up'></i>
      </a>;
    }
    return <div>
      Rendezés: 
      <select defaultValue={this.state.selectedValue} onChange={this.onSelectionChange} style={{width: 'auto'}}>
        {this.props.fields.map(field=>{
          return <option value={field.value} key={`sort-option-${field.value}`}>{field.name}</option>;
        })}
      </select>
      {chevron}
    </div>;
  }
});
