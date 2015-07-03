import GroupedKata from './grouped-kata.js';
import {KATAS_URL} from './config.js';
import {loadFileOnServer} from './_external-deps/http-get.js';

new GroupedKata(loadFileOnServer, KATAS_URL).load(() => {}, (katas) => {
  document.getElementById('app').innerHTML = JSON.stringify(katas);
});