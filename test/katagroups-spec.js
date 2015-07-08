import assert from 'assert';
import KataGroups from '../src/katagroups.js';

describe('kata groups (data for rendering)', function() {

  describe('a group', function() {
    const defaultGroupName = 'group one';
    let firstGroup;
    const katas = [
      {name: 'jojo', path: 'some', id: '42'}
    ];

    function render(groupName = defaultGroupName) {
      const rawData = {[groupName]: {items: katas}};
      let kataGroups = KataGroups.fromRawKataData(rawData);
      firstGroup = kataGroups.groups[0];
    }
    beforeEach(render);

    it('has the name of the kata group', () => {assert.equal(firstGroup.name, defaultGroupName); });
    it('has a katasCount', () => {assert.equal(firstGroup.katasCount, 1); });
    it('has all katas', () => {assert.strictEqual(firstGroup.katas, katas); });
    it('has the right URL, url encoded', () => {
      render('to / be % encoded');
      assert.strictEqual(firstGroup.url, '#kataGroup=to%20%2F%20be%20%25%20encoded'); 
    });
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });

  describe('provides', function() {
    const katas = [
      {name: 'jojo', path: 'some', id: '42'}
    ];
    let kataGroups;
    beforeEach(function() {
      const rawData = {'group name': {items: katas}};
      kataGroups = KataGroups.fromRawKataData(rawData);
    });
    it('`firstGroup`', () => {assert.strictEqual(kataGroups.firstGroup, kataGroups.groups[0]); });
  });

  describe('select', function() {
    const groupName = 'group one';
    let kataGroups;
    const secondKataId = '23';
    const secondKataName = 'second kata';
    const katas = [
      {name: 'jojo', path: 'some', id: '42'},
      {name: secondKataName, path: 'some2', id: secondKataId}
    ];
    beforeEach(function() {
      const rawData = {[groupName]: {items: katas}};
      kataGroups = KataGroups.fromRawKataData(rawData);
    });

    describe('a kata group', function() {
      it('by name', function() {
        kataGroups.selectGroupByName(groupName);
        assert.equal(kataGroups.selectedGroup.name, groupName);
      });
    });
    describe('a kata', function() {
      it('by id', function() {
        kataGroups.selectKataById(secondKataId);
        assert.equal(kataGroups.selectedKata.name, secondKataName);
      });
    });
    describe('when a kata ID is invalid', function() {
      it('dont fail', function() {
        const fn = () => { kataGroups.selectKataById(-1); };
        assert.doesNotThrow(fn);
      });
      it('`selectedKata` is undefined', function() {
        kataGroups.selectKataById(-1);
        assert.equal(kataGroups.selectedKata, void 0);
      });
    });
  });
});
