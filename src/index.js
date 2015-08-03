import RawKataData from './rawkatadata.js';
import KataGroups from './katagroups.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';
import {byUrl as selectGroupByUrl} from './selectkatagroup.js';

class AppState {
  initialize(rawKataData) {
    this.kataGroups = KataGroups.fromRawKataData(rawKataData);
  }
  updateFromUrl(rawUrl) {
    selectGroupByUrl(this.kataGroups, rawUrl);
  }
}

class AppControl {
  constructor() {
    this.appState = new AppState();
  }
  initialize(loadRemoteFile, katasUrl, url) {
    new RawKataData(loadRemoteFile, katasUrl).load(() => {}, (rawKataData) => {
      this.appState.initialize(rawKataData);
      this.appState.updateFromUrl(url);
      this.rerender();
    });
    window.addEventListener('hashchange', ({newURL: newUrl}) => {
      this.appState.updateFromUrl(newUrl);
      this.rerender();
    });
  }
  rerender() {
    const kataGroups = this.appState.kataGroups;
    React.render(<Page kataGroups={kataGroups} appUrl={AppUrl}/>, document.getElementById('app'));
  }
}

const url = window.location.href;
const appControl = new AppControl();
appControl.initialize(loadRemoteFile, KATAS_URL, url);
