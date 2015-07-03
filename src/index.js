import GroupedKata from './grouped-kata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';

import React from 'react';

class Page extends React.Component {
  render() {
    return <div>
      <h1>My ES6 katas</h1>
      {Object.keys(this.props.katas).map(groupName => <h2>{groupName}</h2>)}
    </div>;
  }
}

new GroupedKata(loadRemoteFile, KATAS_URL).load(() => {}, (katas) => {
  React.render(<Page katas={katas}/>, document.getElementById('app'));
});
