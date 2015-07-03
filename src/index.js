import RawKataData from './rawkatadata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';

new RawKataData(loadRemoteFile, KATAS_URL).load(() => {}, (_groupedKatas) => {
  React.render(<Page groupedKatas={groupedKatas}/>, document.getElementById('app'));
});
