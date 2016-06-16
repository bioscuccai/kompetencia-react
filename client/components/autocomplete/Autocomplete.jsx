"use strict";

import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      currentInput: "",
      results: this.props.inputs || [],
      hidden: true
    };
  },
  
  componentWillReceiveProps(nextProps){
    if(!_.isEqual(this.props, nextProps)){
      this.setState({
        results: nextProps.inputs
      });
    }
  },
  
  componentDidMount(){
  },
  
  filteredResults(to){
    return this.props.inputs.filter(e=>e.toUpperCase().includes(to.toUpperCase()));
  },
  
  render(){
    let listClass=classnames({
      'autocomplete-container': true,
      'autocomplete-list-hidden': this.state.hidden || this.state.results.length===0
    });
    return <span>
      <input type='text' value={this.state.currentInput}
        onChange={this.onSearchChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}></input>
      <div className={listClass}>
        <div className='autocomplete-list'>
          {this.state.results.map(result=>{
            return <div
              className='autocomplete-item'
              key={`autocomplete-result-${result}`}
              onClick={this.selectResult.bind(this, result)}
              >{result}</div>;
          })}
        </div>
      </div>
    </span>;
  },
  
  onSearchChange(e){
    this.setState({
      currentInput: e.target.value,
      results: this.filteredResults(e.target.value)
    });
    if(this.props.onChange){
      this.props.onChange(e.target.value);
    }
  },
  
  onFocus(){
    clearTimeout(this.hide);
    this.setState({
      hidden: false
    });
  },
  
  onBlur(){
    clearTimeout(this.hide);
    setTimeout(()=>{
      this.setState({
        hidden: true
      });
    }, 500);
  },
  
  selectResult(result){
    this.setState({
      currentInput: result,
      results: this.filteredResults(result)
    });
    if(this.props.onChange){
      this.props.onChange(result);
    }
  },
  
  clear(){
    this.setState({
      currentInput: "",
      results: this.filteredResults("")
    });
  }
});
