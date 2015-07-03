/* global describe, it */

import assert from 'assert';
import RawKataData from '../src/rawkatadata.js';

function remoteFileLoaderWhichReturnsGivenData(data) {
  return (url, onLoaded) => {
    onLoaded(null, data);
  };
}
function remoteFileLoaderWhichReturnsError(error) {
  return (url, onLoaded) => {
    onLoaded(error);
  };
}

describe('load ES6 kata data', function() {

  it('loaded data are as expected', function(done) {
    function onSuccess(groupedKatas) {
      assert.ok(groupedKatas);
      done();
    }

    const validData = JSON.stringify({groups: {}});
    const loaderStub = remoteFileLoaderWhichReturnsGivenData(validData);
    new RawKataData(loaderStub, 'irrelevant url').load(() => {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {

    it('invalid JSON', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      const loaderStub = remoteFileLoaderWhichReturnsError(new Error(''));
      new RawKataData(loaderStub, 'irrelevant url').load(onError);
    });
    it('for invalid data', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      const invalidData = JSON.stringify({propertyGroupsMissing:{}});
      const loaderStub = remoteFileLoaderWhichReturnsGivenData(invalidData);
      new RawKataData(loaderStub, 'irrelevant url').load(onError);
    });
  });
});
