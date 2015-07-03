var assert = require('assert');
var katasUrl = 'http://katas.tddbin.com/katas/es6/language/__grouped__.json';

describe('load ES6 kata data', function() {
  it('loaded data are as expected', function(done) {
    function onSuccess(groupedKatas) {
      assert.equal('groups' in groupedKatas, true);
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

      var invalidUrl = 'http://katas.tddbin.com/katas/es6/language';
      loadGroupedKata(invalidUrl, onError);
    });
  });
});

function loadGroupedKata(katasUrl, onError, onSuccess) {
  function onLoaded(err, data) {
    try {
      var parsed = JSON.parse(data);
    } catch (jsonParseError) {
      onError(jsonParseError);
    }
    if (err) {
      onError(err);
    } else {
      onSuccess(parsed);
    }
  }

  loadFileOnServer(katasUrl, onLoaded);
}

var http = require('http');
var url = require('url');
var path = require('path');

function loadFileOnServer(fileUrl, onLoaded) {
  var data = '';
  var options = url.parse(fileUrl);
  options.headers = {'User-Agent': ''}; // github wants a user agent header
  var request = http.request(options, function(res) {
    res.on('data', function(chunk) {data += chunk;});
    res.on('end', function() {
      onLoaded(null, data);
    })
  });
  request.on('error', function(e) { onLoaded(e); });
  request.end();
}
