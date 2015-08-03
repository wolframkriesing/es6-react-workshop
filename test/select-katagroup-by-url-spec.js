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
      sinon.stub(kataGroups, 'selectGroupByName');

      let noUrlData = {};
      selectGroupByUrl(kataGroups, noUrlData);

      assert.notCalled(kataGroups.selectGroupByName);
    });
    it('for a hash without `kataGroup`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');

      let urlDataWithoutValidKataGroup = {nokatagroup: 'bla'};
      selectGroupByUrl(kataGroups, urlDataWithoutValidKataGroup);

      assert.notCalled(kataGroups.selectGroupByName);
    });
  });

  describe('select right kata group', function() {
    it('a hash with `kataGroup=x`', function() {
      let kataGroups = new KataGroups();
      sinon.stub(kataGroups, 'selectGroupByName');

      let urlData = {kataGroup: 'x'};
      selectGroupByUrl(kataGroups, urlData);

      assert.calledWith(kataGroups.selectGroupByName, 'x');
    });

    describe('the kataGroup is made readable in the URL (should not ugly encode like %20)', function() {
      it('a kataGroup "Spread operator" shall become "Spread_operator"', function() {
        let kataGroups = KataGroups.fromNames(['Spread operator']);
        sinon.stub(kataGroups, 'selectGroupByName');
    
        let urlData = {kataGroup: 'Spread_operator'};
        selectGroupByUrl(kataGroups, urlData);
    
        assert.calledWith(kataGroups.selectGroupByName, 'Spread operator');
      });
    });
  });

});
