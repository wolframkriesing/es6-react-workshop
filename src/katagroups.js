export default class KataGroups {

  constructor() {
    this._selectedGroup = void 0;
    this._selectedKata = void 0;
  }

  static fromRawKataData(rawGroups) {
    let kataGroups = new KataGroups();
    kataGroups.groups = Object
      .keys(rawGroups)
      .map(groupName => {
        const group = rawGroups[groupName];
        const katas = group.items;
        return new KataGroup(groupName, group.slug, katas);
      })
      .sort(({katasCount: katasCount1}, {katasCount: katasCount2}) => {
        return katasCount2 - katasCount1;
      });
    return kataGroups;
  }

  get firstGroup() {
    return this.groups[0];
  }

  get selectedGroup() {
    return this._selectedGroup || this.firstGroup;
  }

  get selectedKata() {
    return this._selectedKata || this.firstGroup.katas[0];
  }

  selectGroup(group) {
    this._selectedGroup = group;
  }

  selectGroupBySlug(slugToSelect) {
    this.groups.some(group => {
      if (group.slug === slugToSelect) {
        this.selectGroup(group);
        return true; // stop iterating
      }
    });
  }

  selectKata(kata) {
    this._selectedKata = kata;
  }

  selectKataById(kataId) {
    this.resetSelectedKata();
    const katasWithKataId = this.groups
      .map(({katas}) => katas) // extract all katas, which are still arrays
      .reduce((katas, all = []) => all.concat(katas)) // flatten the katas
      .filter(kata => kata.id === kataId); // find the one with the id we want
    if (katasWithKataId.length === 1) {
      this.selectKata(katasWithKataId[0]);
      this.selectGroup(this.selectedKata.kataGroup);
    }
  }

  resetSelectedKata() {
    this._selectedKata = void 0;
  }

}

export class KataGroup {
  constructor(name, slug, katas) {
    this.name = name;
    this.slug = slug;
    this.katasCount = katas.length;
    this.katas = katas.map(kata => Kata.fromRawKataData(kata, this));
  }
}

class Kata {

  constructor(kata, group) {
    this.id = kata.id;
    this.name = kata.name;
    this.description = kata.description;
    this.path = kata.path;
    this.kataGroup = group;
  }

  static fromRawKataData(rawKataData, kataGroup) {
    return new Kata(rawKataData, kataGroup);
  }
}
