export default class KataGroups {
  static fromRawKataData(rawGroups) {
    let kataGroups = new KataGroups();
    kataGroups.groups = Object
      .keys(rawGroups)
      .map(groupName => new KataGroup(groupName, rawGroups[groupName].items));
    return kataGroups;
  }
  
  selectGroupByName(nameToSelect) {
    this.groups.some(group => {
      if (group.name === nameToSelect) {
        this.selectedGroup = group;
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
      this.selectedKata = katasWithKataId[0];
    }
  }
  
  resetSelectedKata() {
    this.selectedKata = void 0;
  }
  
}

class KataGroup {
  constructor(name, items) {
    this.name = name;
    this.katasCount = items.length;
    this.katas = items;
  }
}
