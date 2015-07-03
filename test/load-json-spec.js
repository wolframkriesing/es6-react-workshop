/* global describe, it */

import assert from 'assert';
const urlPrefix = 'http://katas.tddbin.com/katas/es6/language';
const katasUrl = `${urlPrefix}/__grouped__.json`;

import GroupedKata from '../src/grouped-kata.js';

describe('load ES6 kata data', function() {
  it('loaded data are as expected', function(done) {
    function onSuccess(groupedKatas) {
      assert.ok(groupedKatas);
      done();
    }

    new GroupedKata(katasUrl).load(() => {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {
    it('invalid JSON', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      var invalidUrl = urlPrefix;
      new GroupedKata(invalidUrl).load(onError);
    });
    it('for invalid data', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      var invalidData = `${urlPrefix}/__all__.json`;
      new GroupedKata(invalidData).load(onError);
    });
  });
});
