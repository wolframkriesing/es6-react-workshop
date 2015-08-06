import {parse as parseUrl} from 'url';

export default class AppUrl {

  static buildUrlForKataGroup(kataGroup) {
    return `${window.location.pathname}#/kata/${encodeURIComponent(kataGroup.slug)}`;
  }

  static buildUrlForKata(kata) {
    return `${AppUrl.buildUrlForKataGroup(kata.kataGroup)}/${kata.id}`;
  }

  static urlData(url) {
    const parsedUrl = parseUrl(url);
    if (parsedUrl && parsedUrl.hash && parsedUrl.hash.startsWith('#/kata')) {
      const hashData = parsedUrl.hash.replace(/^#\/kata\//, '');
      const [kataGroupSlug, kataId] = hashData.split('/');
      return {kataGroupSlug, kataId};
    }
    return {};
  }

}
