export default class KataGroups {
  static fromRawKataData(rawGroups) {
    let kataGroups = new KataGroups();
    kataGroups.groups = Object.keys(rawGroups).map(groupName => new KataGroup(groupName, rawGroups[groupName].items));
    return kataGroups;
  }
}

class KataGroup {
  constructor(name, items) {
    this.name = name;
    this.katasCount = items.length;
  }
}
