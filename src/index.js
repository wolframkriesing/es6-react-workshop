import RawKataData from './rawkatadata.js';
import KataGroups from './katagroups.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';

let kataGroups;
new RawKataData(loadRemoteFile, KATAS_URL).load(() => {}, (rawKataData) => {
  kataGroups = KataGroups.fromRawKataData(rawKataData);
  rerender(kataGroups);
});

function rerender(groupedKatas) {
  React.render(<Page kataGroups={groupedKatas}/>, document.getElementById('app'));
}
