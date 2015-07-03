import assert from 'assert';
import KataGroups from '../src/katagroups.js';

describe('kata data for rendering', function() {

  let kataGroups;
  describe('a group', function() {
    
    const groupName = 'group one';
    let firstGroup;
    beforeEach(function() {
      const rawData = {[groupName]: {items: [{name: 'jojo', path: 'some'}]}};
      kataGroups = KataGroups.fromRawKataData(rawData);
      firstGroup = kataGroups.groups[0];
    });
    it('has the name of the kata group', () => {assert.equal(firstGroup.name, groupName)});
    it('has a katasCount', () => {assert.equal(firstGroup.katasCount, 1)});
    
    it('get kata group by name', function() {
      kataGroups.selectGroupByName(groupName);
      assert.equal(kataGroups.selectedGroup.name, groupName);
    });
    
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });
});

