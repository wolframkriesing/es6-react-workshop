import RawKataData from './rawkatadata.js';
import KataGroups from './katagroups.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';
import React from 'react';
import Page from './components/page.js';
import {byUrl as selectGroupByUrl} from './selectkatagroup.js';


class AppUrl {
  constructUrlForKata(kata) {
    const urlWithoutKataId = window.location.href.replace(/&kataId=\d+$/, '');
    return `${urlWithoutKataId}&kataId=${kata.id}`;
  }
  constructUrlForKataGroup(kataGroup) {
    const urlWithoutKataGroup = window.location.href.replace(/#kataGroup=.*/, '');
    var name = kataGroup.name.replace(' ', '_');
    return `${urlWithoutKataGroup}#kataGroup=${encodeURIComponent(name)}`;
  }
}

class AppData {
  constructor() {
    this.kataGroups = null;
    this.appUrl = new AppUrl();
    this._onUpdateFns = [];
  }
  initialize({loadRemoteFile, KATAS_URL, rawUrl}) {
    new RawKataData(loadRemoteFile, KATAS_URL).load(() => {}, (rawKataData) => {
      this.kataGroups = KataGroups.fromRawKataData(rawKataData);
      this._triggerOnUpdateFns();
    });
    window.addEventListener('hashchange', ({newURL: newUrl}) => { this.fromRawUrl(newUrl); });
  }
  fromRawUrl(rawUrl) {
    selectGroupByUrl(this.kataGroups, rawUrl);
    this._triggerOnUpdateFns();
  }
  onUpdate(doWhat) {
    this._onUpdateFns.push(doWhat);
  }

  _triggerOnUpdateFns() {
    const kataGroups = this.kataGroups;
    const appUrl = this.appUrl;
    this._onUpdateFns[0]({kataGroups, appUrl});
  }
}

const url = window.location.href;
const appData = new AppData();
appData.onUpdate(rerender);
appData.initialize({loadRemoteFile, KATAS_URL, rawUrl: url});
//appData.updateFromUrl(url);

function rerender({kataGroups, appUrl}) {
  React.render(<Page kataGroups={kataGroups} appUrl={appUrl}/>, document.getElementById('app'));
}
