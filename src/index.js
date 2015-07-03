import GroupedKata from './grouped-kata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';

new GroupedKata(loadRemoteFile, KATAS_URL).load(() => {}, (katas) => {
  React.render(<Page katas={katas}/>, document.getElementById('app'));
});
