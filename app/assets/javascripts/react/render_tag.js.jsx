import React from 'react';
import ReactDOM from 'react-dom';

import Query from './components/query/query.js.jsx';
import CompetenceChooser from './components/competence_chooser/competence_chooser.js.jsx';
import CompetenceTierGroups from './components/competence_tier_group/competence_tier_groups.js.jsx';
import CompetenceTypes from './components/competence_type/competence_types.js.jsx';
import Subordinates from './components/subordinates/subordinates.js.jsx';
import Availabilities from './components/availabilites/availabilities.jsx';
import PersonRequests from './components/person_requests/person_requests.js.jsx';

export default function renderTag(tag, props, selector){
  //eval nem muxik
  let elem;
  switch(tag){
    case 'Subordinates':
      elem=Subordinates;
      break;
    case 'CompetenceTypes':
      elem=CompetenceTypes;
      break;
    case 'CompetenceTierGroups':
      elem=CompetenceTierGroups;
      break;
    case 'CompetenceChooser':
      elem=CompetenceChooser;
      break;
    case 'Query':
      elem=Query;
      break;
    case 'Availabilities':
      elem=Availabilities;
      break;
    case 'PersonRequests':
      elem=PersonRequests;
      break;
  }
  //TODO: a selector egy id
  ReactDOM.render(React.createElement(elem, props), document.getElementById(selector));
}
