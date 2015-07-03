/* global describe, it */

import assert from 'assert';
import GroupedKata from '../src/grouped-katas.js';

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
    new GroupedKata(loaderStub, 'irrelevant url').load(() => {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {

    it('invalid JSON', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      const loaderStub = remoteFileLoaderWhichReturnsError(new Error(''));
      new GroupedKata(loaderStub, 'irrelevant url').load(onError);
    });
    it('for invalid data', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      const invalidData = JSON.stringify({propertyGroupsMissing:{}});
      const loaderStub = remoteFileLoaderWhichReturnsGivenData(invalidData);
      new GroupedKata(loaderStub, 'irrelevant url').load(onError);
    });
  });
});

describe('prepare kata data for rendering', function() {

  let kataGroups;
  function processRawData(rawData) {
    function onSuccess(groupedKatas) {
      kataGroups = process(groupedKatas);
    }
    const validData = JSON.stringify(rawData);
    const loaderStub = remoteFileLoaderWhichReturnsGivenData(validData);
    new GroupedKata(loaderStub, 'irrelevant url').load(() => {}, onSuccess);
  }

  describe('a group', function() {
    it('becomes a KataGroup', function() {
      processRawData({groups: {'group one': {items: [{name: 'jojo', path: 'some'}]}}});
      
      assert.equal(kataGroups[0] instanceof KataGroup, true);
    });
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });
});

function process(rawGroups) {
  return Object.keys(rawGroups).map(groupName => new KataGroup(groupName));
}

class KataGroup {
  constructor(name) {
  }
}