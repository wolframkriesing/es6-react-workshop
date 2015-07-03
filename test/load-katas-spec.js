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
    
    const groupName = 'group one';
    let firstGroup;
    beforeEach(function() {
      processRawData({groups: {[groupName]: {items: [{name: 'jojo', path: 'some'}]}}});
      firstGroup = kataGroups[0];
    });
    it('becomes a KataGroup', () => {assert.equal(firstGroup instanceof KataGroup, true)});
    it('has the name of the kata group', () => {assert.equal(firstGroup.name, groupName)});
    it('has a katasCount', () => {assert.equal(firstGroup.katasCount, 1)});
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });
});

function process(rawGroups) {
  return Object.keys(rawGroups).map(groupName => new KataGroup(groupName, rawGroups[groupName].items));
}

class KataGroup {
  constructor(name, items) {
    this.name = name;
    this.katasCount = items.length;
  }
}