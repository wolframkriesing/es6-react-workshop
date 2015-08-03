import {parse as parseUrl} from 'url';
import {parse as parseQuerystring} from 'querystring';

export default class AppUrl {
  static buildUrlForKata(kata) {
    const urlWithoutKataId = window.location.href.replace(/&kataId=\d+$/, '');
    return `${urlWithoutKataId}&kataId=${kata.id}`;
  }
  static buildUrlForKataGroup(kataGroup) {
    const urlWithoutKataGroup = window.location.href.replace(/#kataGroup=.*/, '');
    var name = kataGroup.name.replace(' ', '_');
    return `${urlWithoutKataGroup}#kataGroup=${encodeURIComponent(name)}`;
  }
  static parseUrl(url) {
    const parsedUrl = parseUrl(url);
    if (parsedUrl && parsedUrl.hash) {
      return parseQuerystring(parsedUrl.hash.replace(/^#/, ''));
    }
    return {};
  }
}
