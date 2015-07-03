var assert = require('assert');
var katasUrl = 'http://katas.tddbin.com/katas/es6/language/__grouped__.json';

describe('load ES6 kata data', function() {
  it('loading data works', function(done) {
    function onLoaded(err, groupedKatas) {
      assert.equal('groups' in groupedKatas, true);
      done();
    }
    loadFileOnServer(katasUrl, onLoaded);
  });
});
