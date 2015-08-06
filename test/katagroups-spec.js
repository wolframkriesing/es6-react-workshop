import assert from 'assert';
import KataGroups from '../src/katagroups.js';

describe('kata groups (data for rendering)', function() {

  describe('a group', function() {
    let firstGroup;
    const katas = [
      {name: 'jojo', path: 'some', id: '42'}
    ];
    const slug = 'group-slug';

    function createKataGroups(groupName = 'group one') {
      const rawData = {[groupName]: {items: katas, slug: slug}};
      let kataGroups = KataGroups.fromRawKataData(rawData);
      firstGroup = kataGroups.groups[0];
    }
    beforeEach(createKataGroups);
    it('has the name of the kata group', () => {
      var groupName = 'group name';
      createKataGroups(groupName);
      assert.equal(firstGroup.name, groupName);
    });
    it('has a katasCount', () => {assert.equal(firstGroup.katasCount, 1); });
    it('contains the given kata', () => {assert.strictEqual(firstGroup.katas[0].id, katas[0].id); });
    it('has a slug', () => {assert.strictEqual(firstGroup.slug, slug); });
  });
  it('a group without items ...', function() {
    //processRawData({groups: {'group one': {items: []}}});
  });

  it('sorts all groups by number of katas insides', function() {
    const oneKata = {name: 'jojo', path: 'some', id: '42'};
    const rawData = {
      ['one']: {items: [oneKata], slug: '1'},
      ['two']: {items: [oneKata, oneKata, oneKata], slug: '2'}
    };
    let kataGroups = KataGroups.fromRawKataData(rawData);
    assert.equal(kataGroups.firstGroup.name, 'two');
  });
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

describe('selecting', function() {

  describe('by default, when nothing was explicitly selected', function() {
    it('the first group is selected', function() {
      const rawData = {
        one: {items: [], slug: 'one'},
        two: {items: [], slug: 'two'}
      };
      const kataGroups = KataGroups.fromRawKataData(rawData);

      assert.deepEqual(kataGroups.firstGroup, kataGroups.selectedGroup);
    });
    it('the first kata of the first group is selected', function() {
      const rawData = {
        one: {items: [{id: 1}], slug: 'one'},
        two: {items: [{id: 2}], slug: 'two'}
      };
      const kataGroups = KataGroups.fromRawKataData(rawData);

      assert.deepEqual(kataGroups.firstGroup.katas[0], kataGroups.selectedKata);
    });
  });

  describe('a kata group', function() {
    it('by slug', function() {
      const groupName = 'group one';
      const groupSlug = 'group_one';
      const rawData = {[groupName]: {items: [], slug: groupSlug}};
      const kataGroups = KataGroups.fromRawKataData(rawData);

      kataGroups.selectGroupBySlug(groupSlug);
      assert.equal(kataGroups.selectedGroup.name, groupName);
    });
    describe('selects the first kata in this group', function() {
      it('by default', function() {
        const rawData = {
          one: {items: [{id: 1}], slug: 'one'},
          two: {items: [{id: 2}], slug: 'two'}
        };
        const kataGroups = KataGroups.fromRawKataData(rawData);

        kataGroups.selectGroupBySlug('two');
        assert.equal(kataGroups.selectedKata.id, 2);
      });
      it('when a kata was selected before', function() {
        const rawData = {
          one: {items: [{id: 1}], slug: 'one'},
          two: {items: [{id: 2}], slug: 'two'}
        };
        const kataGroups = KataGroups.fromRawKataData(rawData);

        kataGroups.selectKataById(1);
        kataGroups.selectGroupBySlug('two');
        assert.equal(kataGroups.selectedKata.id, 2);
      });
    });
  });

  describe('a kata', function() {

    let kataGroups;
    const secondKataId = '23';
    const secondKataName = 'second kata';
    beforeEach(function() {
      const katas = [
        {name: 'jojo', path: 'some', id: '42'},
        {name: secondKataName, path: 'some2', id: secondKataId}
      ];
      const rawData = {['group one']: {items: katas, slug: 'group_one'}};
      kataGroups = KataGroups.fromRawKataData(rawData);
    });

    it('by id', function() {
      kataGroups.selectKataById(secondKataId);
      assert.equal(kataGroups.selectedKata.name, secondKataName);
    });
    describe('when a kata ID is invalid', function() {
      it('dont fail', function() {
        const fn = () => { kataGroups.selectKataById(-1); };
        assert.doesNotThrow(fn);
      });
      it('`selectedKata` is the first of the selected group', function() {
        kataGroups.selectKataById(-1);
        assert.equal(kataGroups.selectedKata, kataGroups.firstGroup.katas[0]);
      });
    });
  });
});
