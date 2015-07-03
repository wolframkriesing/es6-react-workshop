/* global describe, it */

import assert from 'assert';
import {KATAS_URL, URL_PREFIX} from '../src/config.js';
import GroupedKata from '../src/grouped-kata.js';

describe('load ES6 kata data', function() {

  it('loaded data are as expected', function(done) {
    const loadRemoteFileStub = (url, onLoaded) => {
      let validData = JSON.stringify({groups: {}});
      onLoaded(null, validData);
    };
    function onSuccess(groupedKatas) {
      assert.ok(groupedKatas);
      done();
    }
  
    new GroupedKata(loadRemoteFileStub, KATAS_URL).load(() => {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {
    
    it('invalid JSON', function(done) {
      const loadRemoteFileStub = (url, onLoaded) => {
        onLoaded(new Error(''));
      };
      function onError(err) {
        assert.ok(err);
        done();
      }

      new GroupedKata(loadRemoteFileStub, '').load(onError);
    });
    it('for invalid data', function(done) {
      const invalidData = JSON.stringify({propertyGroupsMissing:{}});
      const loadRemoteFileStub = (url, onLoaded) => {
        onLoaded(null, invalidData);
      };
      function onError(err) {
        assert.ok(err);
        done();
      }

      new GroupedKata(loadRemoteFileStub, '').load(onError);
    });
  });
});
