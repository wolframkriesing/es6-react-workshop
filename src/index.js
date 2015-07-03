import GroupedKata from './grouped-kata.js';
import {KATAS_URL} from './config.js';
import {loadRemoteFile} from './_external-deps/http-get.js';

new GroupedKata(loadRemoteFile, KATAS_URL).load(() => {}, (katas) => {
  document.getElementById('app').innerHTML = JSON.stringify(katas);
});