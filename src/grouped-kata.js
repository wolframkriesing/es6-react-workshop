import {loadFileOnServer} from '../src/server/http-get.js';

export default class GroupedKata{
  constructor(katasUrl){
    this.katasUrl = katasUrl;
  }
  
  load(onError, onSuccess) {
    function onLoaded(err, data) {
      var parsed;
      try {
        parsed = JSON.parse(data);
      } catch (jsonParseError) {
        onError(jsonParseError);
      }
      if (err) {
        onError(err);
      } else if (!('groups' in parsed)) {
        onError(new Error('No groups found in the data'));
      } else {
        onSuccess(parsed.groups);
      }
    }

    loadFileOnServer(this.katasUrl, onLoaded);
  }
}