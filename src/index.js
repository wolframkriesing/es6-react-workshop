import RawKataData from './rawkatadata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';
import AppUrl from './appurl';
import OutgoingUrl from './outgoing-url';
import AppState from './appstate';
import 'babel/polyfill';

class AppControl {
  initialize(loadRemoteFile, katasUrl, url) {
    new RawKataData(loadRemoteFile, katasUrl).load((...args) => {
      console.log(args);
    }, (rawKataData) => {
      this.appState = AppState.initializeFromRawKataData(rawKataData);
      this.appState.updateFromUrlData(AppUrl.urlData(url));
      this.rerender();
    });
    window.addEventListener('hashchange', ({newURL: newUrl}) => {
      this.appState.updateFromUrlData(AppUrl.urlData(newUrl));
      this.rerender();
    });
  }
  rerender() {
    const kataGroups = this.appState.kataGroups;
    React.render(<Page kataGroups={kataGroups} appUrl={AppUrl} outgoingUrl={OutgoingUrl}/>, document.getElementById('app'));
  }
}

const url = window.location.href;
const appControl = new AppControl();
appControl.initialize(loadRemoteFile, KATAS_URL, url);
