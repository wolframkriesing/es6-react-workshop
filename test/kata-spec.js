import assert from 'assert';
import Kata from '../src/kata';

describe('a kata', function() {
  describe('provides', function() {
    it('the release date is a Date instance', function() {
      const rawKata = {publishDateUTC: '2015-04-23T08:32:00.000Z'};
      const kata = Kata.fromRawKataData(rawKata);

      assert.equal(kata.releaseDate instanceof Date, true);
    });
    it('the release date is correct', function() {
      const rawKata = {publishDateUTC: '2015-04-23T08:32:00.000Z'};
      const kata = Kata.fromRawKataData(rawKata);

      assert.equal(kata.releaseDate.toUTCString(), 'Thu, 23 Apr 2015 08:32:00 GMT');
    });
  });
});
