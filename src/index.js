import GroupedKata from './grouped-kata.js';
import {KATAS_URL} from './config.js';

new GroupedKata(KATAS_URL).load(() => {}, (katas) => {
  document.getElementById('app').innerHTML = JSON.stringify(katas);
});