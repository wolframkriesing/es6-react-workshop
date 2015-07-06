/* global describe, it */

import assert from 'assert';
import sinon from 'sinon';
import RawKataData from '../src/rawkatadata.js';
assert.notCalled = sinon.assert.notCalled;
assert.calledOnce = sinon.assert.calledOnce;
assert.calledOnceWith = (spy, ...param) => {
  sinon.assert.calledOnce(spy);
  sinon.assert.calledWith(spy, ...param);
};

function remoteFileLoaderWhichReturnsGivenData(data) {
  return (url, onLoaded) => {
    onLoaded(null, data);
  };
}
function remoteFileLoaderWhichReturnsError(error) {
  return (url, onLoaded) => {
    onLoaded(error);
  };
}
function noop() {}

describe('load ES6 kata data', function() {

  it('loaded data are as expected', function(done) {
    function onSuccess(groupedKatas) {
      assert.ok(groupedKatas);
      done();
    }

    const validData = JSON.stringify({groups: {}});
    const loaderStub = remoteFileLoaderWhichReturnsGivenData(validData);
    new RawKataData(loaderStub, 'irrelevant url').load(() => {}, onSuccess);
  });
  describe('on error, call error callback and the error passed', function() {

    describe('invalid JSON', function() {
      const error = new Error('');
      function load(onError, onSuccess=noop) {
        const loaderStub = remoteFileLoaderWhichReturnsError(error);
        new RawKataData(loaderStub, 'irrelevant url').load(onError, onSuccess);
      }
      it('calls onError once with the right parameter', function() {
        let onError = sinon.stub();
        load(onError);
        assert.calledOnceWith(onError, error);
      });
      it('does NOT call onSuccess', function() {
        let onSuccess = sinon.stub();
        load(noop, onSuccess);
        assert.notCalled(onSuccess);
      });
    });
    describe('for invalid data', function() {
      function load(onError, onSuccess=noop) {
        const invalidData = JSON.stringify({propertyGroupsMissing: {}});
        const loaderStub = remoteFileLoaderWhichReturnsGivenData(invalidData);
        new RawKataData(loaderStub, 'irrelevant url').load(onError, onSuccess);
      }
      it('calls onError', function() {
        let onError = sinon.stub();
        load(onError);
        assert.calledOnce(onError);
      });
      it('does NOT call onSuccess', function() {
        let onSuccess = sinon.stub();
        load(noop, onSuccess);
        assert.notCalled(onSuccess);
      });
    });

  });
});
