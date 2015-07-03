export default class SelectKataGroup {
  static byUrl(kataGroups, url) {
    const kataGroupName = urlHashAsObject(url).kataGroup;
    if (kataGroupName) {
      kataGroups.selectGroupByName(kataGroupName);
    }
  }
  
}

import {parse as parseUrl} from 'url';
import {parse as parseQuerystring} from 'querystring';
function urlHashAsObject(url) {
  const parsedUrl = parseUrl(url);
  if (parsedUrl && parsedUrl.hash) {
    return parseQuerystring(parsedUrl.hash.replace(/^#/, ''));
  }
  return {};
}
