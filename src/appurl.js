import {parse as parseUrl} from 'url';

export default class AppUrl {

  static buildUrlForKata(kata) {
    const urlParts = window.location.hash.split('/');
    if (urlParts.length >= 3) {
      return `${urlParts.slice(0, 3).join('/')}/${kata.id}`;
    }
  }

  static buildUrlForKataGroup(kataGroup) {
    const urlWithoutKataGroup = window.location.href.replace(/#\/kata.*/, '');
    return `${urlWithoutKataGroup}#/kata/${encodeURIComponent(kataGroup.slug)}`;
  }

  static urlData(url) {
    const parsedUrl = parseUrl(url);
    if (parsedUrl && parsedUrl.hash && parseUrl.hash.startsWith('#/kata')) {
      const hashData = parsedUrl.hash.replace(/^#\/kata\//, '');
      const [kataGroupSlug, kataId] = hashData.split('/');
      return {kataGroupSlug, kataId};
    }
    return {};
  }

}
