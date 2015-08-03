import KataGroups from './katagroups.js';
import AppUrl from './appurl';

export default class AppState {
  static initializeFromKataGroups(kataGroups) {
    let instance = new AppState();
    instance.kataGroups = kataGroups;
    return instance;
  }
  static initializeFromRawKataData(rawKataData) {
    return AppState.initializeFromKataGroups(KataGroups.fromRawKataData(rawKataData));
  }

  updateFromUrl(url) {
    const kataGroupName = AppUrl.parseUrl(url).kataGroup;
    if (kataGroupName) {
      this.kataGroups.selectGroupByName(kataGroupName);
    }
  }
}
