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

var http = require('http');
var url = require('url');

function loadFileOnServer(fileUrl, onLoaded) {
  var data = '';
  var options = url.parse(fileUrl);
  options.headers = {'User-Agent': ''}; // github wants a user agent header
  var request = http.request(options, function(res) {
    res.on('data', function(chunk) {data += chunk;});
    res.on('end', function() {
      onLoaded(null, data);
    });
  });
  request.on('error', function(e) { onLoaded(e); });
  request.end();
}
