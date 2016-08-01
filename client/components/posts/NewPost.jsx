'use strict';

import React from 'react';
import postActions from '../../actions/post_actions';
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';

export default React.createClass({
  getInitialState(){
    return {
      published: false,
      important: false,
      frontPage: false
    };
  },
  
  importantChanged(e){this.setState({important: e.target.checked});},
  frontPageChanged(e){this.setState({frontPage: e.target.checked});},
  publishedChanged(e){this.setState({published: e.target.checked});},
  
  render(){
    return <div>
      <form onSubmit={this.onSubmit}>
        <div>
          Cím:
          <input type='text' ref='title'></input>
        </div>
        <div>
          Bevezető (Markdown):
          <textarea ref='shortText'></textarea>
        </div>
        <div>
          Szöveg (Markdown):
          <textarea ref='text'></textarea>
        </div>
        <div>
          <div>
            <input type='checkbox' onChange={this.publishedChanged} checked={this.state.published}></input> Publikus
          </div>
          <div>
            <input type='checkbox' onChange={this.frontPageChanged} checked={this.state.frontPage}></input> Főoldalon megjelenjen (TODO)
          </div>
          <div>
            <input type='checkbox' onChange={this.importantChanged} checked={this.state.important}></input> Kiemelt (TODO)
          </div>
        </div>
        <div>
          <input type='submit' value="Új post"/>
        </div>
      </form>
    </div>;
  },
  
  onSubmit(e){
    e.preventDefault();
    postActions.createPost(this.refs.title.value,
      this.refs.shortText.value,
      this.refs.text.value,
      this.state.published,
      this.state.frontPage,
      this.state.important)
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
