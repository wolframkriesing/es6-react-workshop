/* global describe, it */

import assert from 'assert';
import {KATAS_URL, URL_PREFIX} from '../src/config.js';
import GroupedKata from '../src/grouped-kata.js';

describe('load ES6 kata data', function() {
  it('loaded data are as expected', function(done) {
    function onSuccess(groupedKatas) {
      assert.ok(groupedKatas);
      done();
    }

    new GroupedKata(KATAS_URL).load(() => {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {
    it('invalid JSON', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      var invalidUrl = URL_PREFIX;
      new GroupedKata(invalidUrl).load(onError);
    });
    it('for invalid data', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      var invalidData = `${URL_PREFIX}/__all__.json`;
      new GroupedKata(invalidData).load(onError);
    });
  });
});
