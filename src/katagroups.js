export default class KataGroups {
  static fromRawKataData(rawGroups) {
    let kataGroups = new KataGroups();
    kataGroups.groups = Object
      .keys(rawGroups)
      .map(groupName => new KataGroup(groupName, rawGroups[groupName].items));
    return kataGroups;
  }
  
  selectGroupByName(nameToSelect) {
    this.selectedGroup = null;
    this.groups.some((group) => {
      if (group.name === nameToSelect) {
        this.selectedGroup = group;
        return true; // stop iterating
      }
    });
  }
  
}

class KataGroup {
  constructor(name, items) {
    this.name = name;
    this.katasCount = items.length;
    this.katas = items;
  }
}
