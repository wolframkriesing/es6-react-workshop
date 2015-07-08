import assert from 'assert';
import AppStartup from '../src/app-startup.js';
import React from 'react';
import {addons} from 'react/addons';
import sinon from 'sinon';

assert.called = sinon.assert.called;
assert.calledWith = sinon.assert.calledWith;

assert.renderedIntoDomNode = function(renderFunction, domNode) {
  assert.equal(renderFunction.firstCall.args[1], domNode);
};

const TestUtils = addons.TestUtils;


describe('app startup', function() {

  describe('the react component', function() {

    class ComponentDouble extends React.Component {
      render() {
        return <b props={this.props}></b>;
      }
    }

    let rendererOutput;
    function render(data={}) {
      const shallowRenderer = TestUtils.createRenderer();
      let app = new AppStartup(ComponentDouble, shallowRenderer.render.bind(shallowRenderer));
      app.renderClientSide(data);
      rendererOutput = shallowRenderer.getRenderOutput();
    }

    it('is rendered into given DOM node', function() {
      const domNode = 'some ref';
      const renderFunction = sinon.stub();
      const ComponentStub = class extends React.Component {};
      let app = new AppStartup(ComponentStub, renderFunction);
      app.renderClientSide({}, domNode);

      assert.renderedIntoDomNode(renderFunction, domNode);
    });

    it('is rendered', function() {
      sinon.spy(ComponentDouble.prototype, 'render');
      render();
      assert.calledWith(ComponentDouble.prototype.render);
    });

    it('with the given data', function() {
      let data = {my: 'data'};
      render(data);
      assert.deepEqual(rendererOutput.props.props, {kataGroups: data});
    });
  });

});
