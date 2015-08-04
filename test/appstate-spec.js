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

describe('select kata and/or kata group by given url data', function() {

  describe('selects the first group+it`s first kata', function() {
    let kataGroups;
    beforeEach(function() {
      const rawData = {
        group1: {name: 'one', items: []},
        group2: {name: 'two', items: []}
      };
      kataGroups = KataGroups.fromRawKataData(rawData);
    });
    it('when no URL data are given', function() {
      let noUrlData = {};
      selectGroupByUrl(kataGroups, noUrlData);

      //assert.equal(kataGroups.selectedGroup, kataGroups.firstGroup);
    });
    it('for url data without valid properties e.g. `kataGroup`', function() {
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
