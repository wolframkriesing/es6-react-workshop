export default class RawKataData{
  constructor(loadRemoteFile, katasUrl){
    this.katasUrl = katasUrl;
    this.loadRemoteFile = loadRemoteFile;
  }
  
  load(onError, onSuccess) {
    const onLoaded = (err, data) => {
      var parsed;
      try {
        parsed = JSON.parse(data);
      } catch (jsonParseError) {
        onError(jsonParseError);
        return;
      }
      if (err) {
        onError(err);
      } else if (!('groups' in parsed)) {
        onError(new Error('No groups found in the data'));
      } else {
        onSuccess(parsed.groups);
      }
    };

    this.loadRemoteFile(this.katasUrl, onLoaded);
  }
  
}
