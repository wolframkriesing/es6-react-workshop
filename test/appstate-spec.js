import assert from 'assert';
import KataGroups from '../src/katagroups.js'; // #todo remove this dependency
import AppState from '../src/appstate';

import sinon from 'sinon';
assert.notCalled = sinon.assert.notCalled;
assert.calledWith = sinon.assert.calledWith;

function updateSelectionByUrl(kataGroups, urlData) {
  let appState = AppState.initializeFromKataGroups(kataGroups);
  appState.updateFromUrlData(urlData);
}

describe('select kata and/or kata group by given url data', function() {

  describe('if select fails, firstGroup+kata stay selected', function() {
    it('when no URL data are given', function() {
      const rawData = {
        group1: {name: 'group1', items: []},
        group2: {name: 'group2', items: []}
      };
      let kataGroups = KataGroups.fromRawKataData(rawData);
      let noUrlData = {};

      updateSelectionByUrl(kataGroups, noUrlData);

      assert.equal(kataGroups.selectedGroup, kataGroups.firstGroup);
    });
  });

  describe('select right kata group', function() {
    it('for `kataGroupSlug=x`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupBySlug');

      let urlData = {kataGroupSlug: 'x'};
      updateSelectionByUrl(kataGroups, urlData);

      assert.calledWith(kataGroups.selectGroupBySlug, 'x');
    });
  });

});
