var loadFileOnServer = require('../src/server/http-get.js');

function GroupedKata(katasUrl) {
  
  this.load = function(onError, onSuccess) {
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

    loadFileOnServer(katasUrl, onLoaded);
  }
}

module.exports = GroupedKata;