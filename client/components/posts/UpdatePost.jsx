'use strict';

import React from 'react';

import postActions from '../../actions/post_actions';
import postStore from '../../stores/post_store';

import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
    };
  },
  
  componentDidMount(){
    postStore.listen(this.handlePostStoreChange);
    postStore.fetchCurrentPost(this.props.postId);
  },
  
  componentWillUnmount(){
    postStore.unlisten(this.handlePostStoreChange);
  },
  
  handlePostStoreChange(state){
    this.setState(state.currentPost);
  },
  
  importantChanged(e){this.setState({important: e.target.checked});},
  frontPageChanged(e){this.setState({front_page: e.target.checked});}, //!!!
  publishedChanged(e){this.setState({published: e.target.checked});},
  
  render(){
    if(_.isEmpty(this.state)){
      return <span></span>;
    }
    return <div>
      <form onSubmit={this.onSubmit}>
        <div>
          Cím:
          <input type='text' ref='title' defaultValue={this.state.title}></input>
        </div>
        <div>
          Bevezető (Markdown):
          <textarea ref='shortText' defaultValue={this.state.short_text}></textarea>
        </div>
        <div>
          Szöveg (Markdown):
          <textarea ref='text' defaultValue={this.state.text}></textarea>
        </div>
        <div>
          <div>
            <input type='checkbox' onChange={this.publishedChanged} checked={this.state.published}></input> Publikus
          </div>
          <div>
            <input type='checkbox' onChange={this.frontPageChanged} checked={this.state.front_page}></input> Főoldalon megjelenjen (TODO)
          </div>
          <div>
            <input type='checkbox' onChange={this.importantChanged} checked={this.state.important}></input> Kiemelt (TODO)
          </div>
        </div>
        <div>
          <input type='submit' value="Módosítás"/>
        </div>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    postActions.updatePost(this.props.postId, this.refs.title.value, this.refs.shortText.value, this.refs.text.value,
    this.state.published, this.state.front_page, this.state.important)
    .then(data=>{
      if(_.get(data, "data.status")==='ok'){
        NotificationManager.info("ok");
        if(this.props.onClose) this.props.onClose();
      } else {
        NotificationManager.error("Hiba");
      }
    })
    .catch(e=>{
      console.log(e);
      NotificationManager.error("Hiba");
    });
  }
});
