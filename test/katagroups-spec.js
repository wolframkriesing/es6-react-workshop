import assert from 'assert';
import KataGroups from '../src/katagroups.js';

describe('kata groups (data for rendering)', function() {

  let kataGroups;
  const groupName = 'group one';
  const kataName = 'jojo';
  const secondKataId = 23;
  const secondKataName = 'second kata';
  const katas = [
    {name: kataName, path: 'some', id: 42},
    {name: secondKataName, path: 'some2', id: secondKataId}
  ];
  
  describe('a group', function() {
    
    let firstGroup;
    beforeEach(function() {
      const rawData = {[groupName]: {items: katas}};
      kataGroups = KataGroups.fromRawKataData(rawData);
      firstGroup = kataGroups.groups[0];
    });
    
    it('has the name of the kata group', () => {assert.equal(firstGroup.name, groupName)});
    it('has a katasCount', () => {assert.equal(firstGroup.katasCount, 2)});
    it('has all katas', () => {assert.deepEqual(firstGroup.katas, katas)});
    
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });
  
  describe('select', function() {
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
      describe('when ID is invalid', function() {
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
});  
