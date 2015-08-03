import AppUrl from './appurl';

export default class SelectKataGroup {
  static byUrl(kataGroups, url) {
    const kataGroupName = AppUrl.parseUrl(url).kataGroup;
    if (kataGroupName) {
      kataGroups.selectGroupByName(kataGroupName);
    }
  }
}

