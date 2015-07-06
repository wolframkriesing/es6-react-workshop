function verifyData(data, onError, onSuccess) {
  try {
    const parsed = JSON.parse(data);
    if (!('groups' in parsed)) {
      onError(new Error('No groups found in the data'));
      return;
    }
    onSuccess(parsed.groups);
  } catch (jsonParseError) {
    onError(jsonParseError);
  }
}

export default class RawKataData{
  constructor(loadRemoteFile, katasUrl){
    this.katasUrl = katasUrl;
    this.loadRemoteFile = loadRemoteFile;
  }

  load(onError, onSuccess) {
    const onLoaded = (error, data) => {
      if (error) {
        onError(error);
        return;
      }
      verifyData(data, onError, onSuccess);
    };

    this.loadRemoteFile(this.katasUrl, onLoaded);
  }
}
