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

  describe('select right kata group', function() {
    it('a hash with `kataGroup=x`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');
      
      let url = 'http://whatever.com/#kataGroup=x';
      selectGroupByQuery(kataGroups, url);
      
      assert.calledWith(kataGroups.selectGroupByName, 'x');
    });
  
    it('a url encoded hash `kataGroup=kata%20name`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');
      
      let url = 'http://whatever.com/#kataGroup=kata%20name';
      selectGroupByQuery(kataGroups, url);
      
      assert.calledWith(kataGroups.selectGroupByName, 'kata name');
    });
  });
  
});

import {parse as parseUrl} from 'url';
import {parse as parseQuerystring} from 'querystring';
function selectGroupByQuery(kataGroups, url) {
  if (url) {
    const kataGroupName = parseQuerystring(parseUrl(url).hash.replace(/^#/, '')).kataGroup
    kataGroups.selectGroupByName(kataGroupName);
  }
}