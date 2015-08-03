import assert from 'assert';
import KataGroups from '../src/katagroups.js'; // #todo remove this dependency
import AppState from '../src/appstate';

import sinon from 'sinon';
assert.notCalled = sinon.assert.notCalled;
assert.calledWith = sinon.assert.calledWith;

function selectGroupByUrl(kataGroups, urlData) {
  let appState = AppState.initializeFromKataGroups(kataGroups);
  appState.updateFromUrlData(urlData);
}

describe('a URL change selects a certain kata group', function() {

  describe('selects nothing', function() {
    it('for an empty query', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupBySlug');

      let noUrlData = {};
      selectGroupByUrl(kataGroups, noUrlData);

      assert.notCalled(kataGroups.selectGroupBySlug);
    });
    it('for a hash without `kataGroup`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupBySlug');

      let urlDataWithoutValidKataGroup = {nokatagroup: 'bla'};
      selectGroupByUrl(kataGroups, urlDataWithoutValidKataGroup);

      assert.notCalled(kataGroups.selectGroupBySlug);
    });
  });

  describe('select right kata group', function() {
    it('a hash with `kataGroupSlug=x`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupBySlug');

      let urlData = {kataGroupSlug: 'x'};
      selectGroupByUrl(kataGroups, urlData);

      assert.calledWith(kataGroups.selectGroupBySlug, 'x');
    });
  });

});
