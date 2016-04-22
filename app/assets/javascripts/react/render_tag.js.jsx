import React from 'react';
import ReactDOM from 'react-dom';

import Query from './components/query/Query.jsx';
import CompetenceChooser from './components/competence_chooser/CompetenceChooser.jsx';
import CompetenceTierGroups from './components/competence_tier_group/CompetenceTierGroups.jsx';
import CompetenceTypes from './components/competence_type/CompetenceTypes.jsx';
import Subordinates from './components/subordinates/Subordinates.jsx';
import Availabilities from './components/availabilites/Availabilities.jsx';
import PersonRequests from './components/person_requests/PersonRequests.jsx';

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
