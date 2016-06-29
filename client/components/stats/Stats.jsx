'use strict';

import React from 'react';
import appActions from '../../actions/app_actions';
import appStore from '../../stores/app_store';
import _ from 'lodash';

export default React.createClass({
  componentDidMount(){
    appStore.listen(this.handleStoreChange);
    appStore.fetchStats();
  },
  
  componentWillUnmount(){
    appStore.unlisten(this.handleStoreChange);
  },
  
  getInitialState(){
    return {
      stats: {}
    };
  },
  
  handleStoreChange(state){
    this.setState({
      stats: state.stats
    });
    console.log(state);
  },
  
  render(){
    return <div>
      <h1>Statisztikák</h1>
      <p>
        Összes felhasználó: <strong>{this.state.stats.user_count}</strong>
      </p>
      <p>
        Felhasználók elfogadott kompetenciákkal: <strong>{this.state.stats.with_assigned}</strong>
      </p>
      <p>
        Felhasználók függő kompetenciákkal: <strong>{this.state.stats.with_pending}</strong>
      </p>
      <p>
        Feladott hirdetések: <strong>{this.state.stats.availability_count}</strong>
      </p>
      <p>
        Kérvények: <strong>{this.state.stats.person_request_count}</strong>
      </p>
      <p>
        Munkahelyek
        <ul>
          {
            _.keys(this.state.stats.workers).map(wp=>{
              return <li key={`wp-${wp}`}>{wp}: <strong>{this.state.stats.workers[wp]}</strong></li>;
            })
          }
        </ul>
      </p>
    </div>;
  }
});
