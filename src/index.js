import RawKataData from './rawkatadata.js';
import KataGroups from './katagroups.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';
import {byUrl as selectGroupByUrl} from './selectkatagroup.js';

let kataGroups;
new RawKataData(loadRemoteFile, KATAS_URL).load(() => {}, (rawKataData) => {
  kataGroups = KataGroups.fromRawKataData(rawKataData);
  rerender(kataGroups);
  urlChanged(window.location.href);
});

function rerender(kataGroups) {
  React.render(<Page kataGroups={kataGroups}/>, document.getElementById('app'));
}

function urlChanged(url) {
  selectGroupByUrl(kataGroups, url);
  rerender(kataGroups);
}

window.addEventListener('hashchange', ({newURL}) => urlChanged(newURL));
