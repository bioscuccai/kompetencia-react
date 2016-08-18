'use strict';

import React from 'react';
import {Link} from 'react-router';
import DateLabel from '../date/DateLabel.jsx';
import ReactMarkdown from 'react-markdown';
import UpdatePostButton from './UpdatePostButton.jsx';

export default React.createClass({
  render(){
    let flag;
    if(this.props.post.important){
      flag=<i className='icon ion-flag' title='Kiemelt'></i>;
    }
    return <div>
      <h1>
        <Link to={`/posts/${this.props.post.id}`}>
          {flag} {this.props.post.title}
        </Link>
        <UpdatePostButton currentUser={this.props.currentUser} post={this.props.post}></UpdatePostButton>
      </h1>
      <div>
        <i className='icon ion-clock'></i> <DateLabel date={this.props.post.created_at}></DateLabel>
      </div>
      <h4>
        <ReactMarkdown source={this.props.post.short_text}></ReactMarkdown>
      </h4>
    </div>;
  }
});
