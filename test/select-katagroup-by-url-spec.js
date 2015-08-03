import assert from 'assert';
import KataGroups from '../src/katagroups.js'; // #todo remove this dependency
import AppState from '../src/appstate';

import sinon from 'sinon';
assert.notCalled = sinon.assert.notCalled;
assert.calledWith = sinon.assert.calledWith;

function selectGroupByUrl(kataGroups, url) {
  let appState = AppState.initializeFromKataGroups(kataGroups);
  appState.updateFromUrl(url);
}

describe('a URL change selects a certain kata group', function() {

  describe('selects nothing', function() {
    it('for an empty query', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');

      let url = '';
      selectGroupByUrl(kataGroups, url);

      assert.notCalled(kataGroups.selectGroupByName);
    });
    it('for a hash without `kataGroup`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');

      let url = 'http://nothing.com/#nokatagroup=bla';
      selectGroupByUrl(kataGroups, url);

      assert.notCalled(kataGroups.selectGroupByName);
    });
  });

  describe('select right kata group', function() {
    it('a hash with `kataGroup=x`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');

      let url = 'http://whatever.com/#kataGroup=x';
      selectGroupByUrl(kataGroups, url);

      assert.calledWith(kataGroups.selectGroupByName, 'x');
    });

    it('a url encoded hash `kataGroup=kata%20name`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');

      let url = 'http://whatever.com/#kataGroup=kata%20name';
      selectGroupByUrl(kataGroups, url);

      assert.calledWith(kataGroups.selectGroupByName, 'kata name');
    });
  });

});
