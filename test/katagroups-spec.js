import assert from 'assert';
import GroupedKata from '../src/grouped-katas.js';

describe('kata data for rendering', function() {

  let kataGroups;
  function processRawData(rawData) {
    function onSuccess(groupedKatas) {
      kataGroups = groupedKatas;
    }
    const validData = JSON.stringify(rawData);
    const loaderStub = (url, onLoaded) => onLoaded(null, validData);
    new GroupedKata(loaderStub, 'irrelevant url').load(() => {}, onSuccess);
  }

  describe('a group', function() {
    
    const groupName = 'group one';
    let firstGroup;
    beforeEach(function() {
      processRawData({groups: {[groupName]: {items: [{name: 'jojo', path: 'some'}]}}});
      firstGroup = kataGroups[0];
    });
    it('has the name of the kata group', () => {assert.equal(firstGroup.name, groupName)});
    it('has a katasCount', () => {assert.equal(firstGroup.katasCount, 1)});
    
    //it('get kata group by name', function() {
    //  kataGroups.selectGroupByName(groupName);
    //  assert.equal(kataGroups.selectedGroup.name, groupName);
    //});
    
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });
});

