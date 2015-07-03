var http = require('http');
var url = require('url');

function loadFileOnServer(fileUrl, onLoaded) {
  var data = '';
  var options = url.parse(fileUrl);
  options.headers = {'User-Agent': ''}; // github wants a user agent header
  var request = http.request(options, function(res) {
    res.on('data', function(chunk) {data += chunk;});
    res.on('end', function() {
      onLoaded(null, data);
    });
  });
  request.on('error', function(e) { onLoaded(e); });
  request.end();
}

module.exports = loadFileOnServer;