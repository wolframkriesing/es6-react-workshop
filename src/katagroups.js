export default class KataGroups {

  constructor() {
    this._selectedGroup = void 0;
    this._selectedKata = void 0;
  }

  static fromRawKataData(rawGroups) {
    let kataGroups = new KataGroups();
    kataGroups.groups = Object
      .keys(rawGroups)
      .map(groupName => new KataGroup(groupName, rawGroups[groupName].slug, rawGroups[groupName].items));
    return kataGroups;
  }

  static fromNames(names) {
    let kataGroups = new KataGroups();
    kataGroups.groups = names.map(name => new KataGroup(name, name, []));
    return kataGroups;
  }

  get firstGroup() {
    return this.groups[0];
  }

  get selectedGroup() {
    return this._selectedGroup;
  }

  get selectedKata() {
    return this._selectedKata;
  }

  selectGroupBySlug(slugToSelect) {
    this.groups.some(group => {
      if (group.slug === slugToSelect) {
        this._selectedGroup = group;
        return true; // stop iterating
      }
    });
  }

  selectKataById(kataId) {
    this.resetSelectedKata();
    const katasWithKataId = this.groups
      .map(({katas}) => katas) // extract all katas, which are still arrays
      .reduce((katas, all = []) => all.concat(katas)) // flatten the katas
      .filter(kata => kata.id === kataId); // find the one with the id we want
    if (katasWithKataId.length === 1) {
      this._selectedKata = katasWithKataId[0];
    }
  }

  resetSelectedKata() {
    this._selectedKata = void 0;
  }

}

export class KataGroup {
  constructor(name, slug, items) {
    this.name = name;
    this.slug = slug;
    this.katasCount = items.length;
    this.katas = items;
  }
}
