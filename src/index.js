import GroupedKata from './grouped-kata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';

import React from 'react';

class Page extends React.Component {
  render() {
    return <div>Hi I am react</div>;
  }
}

new GroupedKata(loadRemoteFile, KATAS_URL).load(() => {}, (katas) => {
  React.render(<Page/>, document.getElementById('app'));
});
