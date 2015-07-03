var assert = require('assert');
var katasUrl = 'http://katas.tddbin.com/katas/es6/language/__grouped__.json';

describe('load ES6 kata data', function() {
  it('loaded data are as expected', function(done) {
    function onLoaded(err, groupedKatas) {
      assert.equal('groups' in groupedKatas, true);
      done();
    }
    loadFileOnServer(katasUrl, onLoaded);
  });
});


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
      const parsed = JSON.parse(data);
      onLoaded(null, parsed);
    })
  });
  request.on('error', function(e) { onLoaded(e); });
  request.end();
}
