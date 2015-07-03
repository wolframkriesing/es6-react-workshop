/* global require, describe, it */

var assert = require('assert');
var urlPrefix = 'http://katas.tddbin.com/katas/es6/language/';
var katasUrl = urlPrefix + '__grouped__.json';

describe('load ES6 kata data', function() {
  it('loaded data are as expected', function(done) {
    function onSuccess(groupedKatas) {
      assert.ok(groupedKatas);
      done();
    }

    loadGroupedKata(katasUrl, function() {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {
    it('invalid JSON', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      var invalidUrl = urlPrefix;
      loadGroupedKata(invalidUrl, onError);
    });
    it('for invalid data', function(done) {
      function onError(err) {
        assert.ok(err);
        done();
      }

      var invalidData = urlPrefix + '__all__.json';
      loadGroupedKata(invalidData, onError);
    });
  });
});

var loadFileOnServer = require('../src/server/http-get.js');
function loadGroupedKata(katasUrl, onError, onSuccess) {
  function onLoaded(err, data) {
    var parsed;
    try {
      parsed = JSON.parse(data);
    } catch (jsonParseError) {
      onError(jsonParseError);
    }
    if (err) {
      onError(err);
    } else if (!('groups' in parsed)) {
      onError(new Error('No groups found in the data'));
    } else {
      onSuccess(parsed.groups);
    }
  }

  loadFileOnServer(katasUrl, onLoaded);
}
