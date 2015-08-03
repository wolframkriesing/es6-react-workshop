import RawKataData from './rawkatadata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';
import AppUrl from './appurl';
import AppState from './appstate';

class AppControl {
  constructor() {
    this.appState;
  }
  initialize(loadRemoteFile, katasUrl, url) {
    new RawKataData(loadRemoteFile, katasUrl).load(() => {}, (rawKataData) => {
      this.appState = AppState.initializeFromRawKataData(rawKataData);
      this.appState.updateFromUrlData(AppUrl.urlData(url));
      this.rerender();
    });
    window.addEventListener('hashchange', ({newURL: newUrl}) => {
      this.appState.updateFromUrlData(newUrl);
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
