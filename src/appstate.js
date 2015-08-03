import KataGroups from './katagroups.js';

export default class AppState {

  static initializeFromKataGroups(kataGroups) {
    let instance = new AppState();
    instance.kataGroups = kataGroups;
    return instance;
  }

  static initializeFromRawKataData(rawKataData) {
    return AppState.initializeFromKataGroups(KataGroups.fromRawKataData(rawKataData));
  }

  updateFromUrlData(urlData) {
    const kataGroupSlug = urlData.kataGroupSlug;
    if (kataGroupSlug) {
      this.kataGroups.selectGroupBySlug(kataGroupSlug);
    }
  }

}
