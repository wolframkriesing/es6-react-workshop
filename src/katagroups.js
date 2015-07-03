export default class KataGroups {
  static fromRawKataData(rawGroups) {
    return Object.keys(rawGroups).map(groupName => new KataGroup(groupName, rawGroups[groupName].items));
  }
}

class KataGroup {
  constructor(name, items) {
    this.name = name;
    this.katasCount = items.length;
  }
}
