import assert from 'assert';
import {replaceOnlineUrls} from '../../src/scripts/make-urls-offline';

describe('modify the dist/index.html file to work offline', function() {

  let indexHtmlContent;
  beforeEach(function() {
    indexHtmlContent = `
  <title>ES6 workshop</title>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.js"></script>
  <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
  <!--[if lte IE 8]>
`;
  });
  describe('replace `http://cdnjs...` with `../vendor/`', function() {
    let replaced;
    beforeEach(function() {
      replaced = replaceOnlineUrls(indexHtmlContent);
    });
    it('removes `cdnjs` URLs', function() {
      assert.equal(replaced.includes('https://cdnjs.cloudflare'), false);
    });
    it('puts `../vendor/` in its place', function() {
      assert.equal(replaced.includes('../vendor/react/0.13.3'), true);
    });
  });

  describe('replaces `http://yui.yahooapis...` with `../vendor/`', function() {
    let replaced;
    beforeEach(function() {
      replaced = replaceOnlineUrls(indexHtmlContent);
    });
    it('removes the YUI URL', function() {
      assert.equal(replaced.includes('http://yui.yahooapis.com/'), false);
    });
    it('puts `../vendor/` in its place', function() {
      assert.equal(replaced.includes('../vendor/pure/0.6.0'), true);
    });
  });

});
