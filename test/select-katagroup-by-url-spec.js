import assert from 'assert';
import KataGroups from '../src/katagroups.js';

import sinon from 'sinon';
assert.notCalled = sinon.assert.notCalled;
assert.calledWith = sinon.assert.calledWith;

describe('a URL change selects a certain kata group', function() {
  
  it('an empty query selects nothing', function() {
    let kataGroups = new KataGroups();
    sinon.stub(kataGroups, 'selectGroupByName');
    
    let url = '';
    selectGroupByQuery(kataGroups, url);
    
    assert.notCalled(kataGroups.selectGroupByName);
  });

  it('a hash with `kataGroup=x` selects that kata group', function() {
    let kataGroups = new KataGroups();
    sinon.stub(kataGroups, 'selectGroupByName');
    
    let url = 'http://whatever.com/#kataGroup=x';
    selectGroupByQuery(kataGroups, url);
    
    assert.calledWith(kataGroups.selectGroupByName, 'x');
  });
  
});

import url from 'url';
import querystring from 'querystring';
function selectGroupByQuery(kataGroups, url) {
  if (url) {
    kataGroups.selectGroupByName('x');
  }
}