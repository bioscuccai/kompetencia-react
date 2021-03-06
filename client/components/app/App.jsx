"use strict";

import React from 'react';
import Container from './Container.jsx';
import Recent from './Recent.jsx';
import Home from './Home.jsx';
import Query from '../query/Query.jsx';
import Users from '../user/Users.jsx';
import User from '../user/User.jsx';
import Subordinates from '../subordinates/Subordinates.jsx';
import SubordinateUserLoader from '../subordinates/SubordinateUserLoader.jsx';
import CompetenceTypes from '../competence_type/CompetenceTypes.jsx';
import CompetenceTierGroups from '../competence_tier_group/CompetenceTierGroups.jsx';
import Availability from '../availabilites/Availabilities.jsx';
import CompetenceChooser from '../competence_chooser/CompetenceChooser.jsx';
import PersonRequests from '../person_requests/PersonRequests.jsx';
import UserEdit from '../user/UserEdit.jsx';
import Stats from '../stats/Stats.jsx';
import SavedQueries from '../reports/SavedQueries.jsx';
import Reports from '../reports/Reports.jsx';
import ReportResults from '../reports/ReportResults.jsx';
import Posts from '../posts/Posts.jsx';
import Post from '../posts/Post.jsx';
import Matrix from '../reports/Matrix.jsx';
import GlobalMatrix from '../reports/GlobalMatrix.jsx';
import EmailDummies from '../email_dummy/EmailDummies.jsx';

import {Router, Route, hashHistory} from 'react-router';

export default React.createClass({
  childContextTypes: {
    currentUser: React.PropTypes.object
  },
  getChildContext(){
    return {
      currentUser: this.props.currentUser
    };
  },
  render(){
    return <Router history={hashHistory}>
        <Route component={Container} props={this.props}>
          <Route path='/' component={Home}></Route>
          <Route path='/query' component={Query}></Route>
          <Route path='/query/:queryString' component={Query}></Route>
          <Route path='/competence_types' component={CompetenceTypes}></Route>
          <Route path='/competence_tier_groups' component={CompetenceTierGroups}></Route>
          <Route path='/users' component={Users}></Route>
          <Route path='/subordinates/:profileUserId' component={Subordinates}></Route>
          <Route path='/users/:profileUserId' component={User}></Route>
          <Route path='/availabilities/:profileUserId' component={Availability}></Route>
          <Route path='/competence_chooser/:profileUserId' component={CompetenceChooser}></Route>
          <Route path='/person_requests/:profileUserId' component={PersonRequests}></Route>
          <Route path='/user_edit' component={UserEdit}></Route>
          <Route path='/stats' component={Stats}></Route>
          <Route path='/reports' component={Reports}></Route>
          <Route path='/saved_queries' component={SavedQueries}></Route>
          <Route path='/report_results/:reportId' component={ReportResults}></Route>
          <Route path='/matrix/:reportId' component={Matrix}></Route>
          <Route path='/global_matrix' component={GlobalMatrix}></Route>
          <Route path='/posts' component={Posts}></Route>
          <Route path='/posts/:postId' component={Post}></Route>
          <Route path='/email_dummies' component={EmailDummies}></Route>          
        </Route>
      </Router>;
  }
});
