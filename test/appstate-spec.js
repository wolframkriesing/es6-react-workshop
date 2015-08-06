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

  describe('for given kata ID', function() {
    let kataGroups;
    beforeEach(function() {
      const rawData = {
        group1: {name: 'group1', slug: 'one', items: [{id: 2}]},
        group2: {name: 'group2', slug: 'two', items: [{id: 3}]}
      };
      kataGroups = KataGroups.fromRawKataData(rawData);

      const urlData = {kataId: 3};
      updateSelectionByUrl(kataGroups, urlData);
    });
    it('select kata properly', function() {
      assert.deepEqual(kataGroups.selectedKata.id, 3);
    });
    it('automatically select kataGroup properly', function() {
      assert.deepEqual(kataGroups.selectedGroup.name, 'group2');
    });

    //describe('and a kataGroup slug of another group (as where the kata with kata ID is in)', function() {
    //  it('keep the katagroup of the kata with kata ID selected', function() {
    //    const mismatchingGroup = 'one';
    //    const urlData = {kataId: 3, kataGroupSlug: mismatchingGroup};
    //    updateSelectionByUrl(kataGroups, urlData);
    //
    //    assert.deepEqual(kataGroups.selectedGroup.name, 'group2');
    //  });
    //});
  });

});
