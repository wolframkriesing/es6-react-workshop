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
    if (urlData.kataGroupSlug) {
      this.kataGroups.selectGroupBySlug(urlData.kataGroupSlug);
    }
    if (urlData.kataId) {
      this.kataGroups.selectKataById(urlData.kataId);
    }
  }

}
