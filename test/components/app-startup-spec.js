import assert from 'assert';
import AppStartup from '../../src/app-startup.js';
import React from 'react';
import {addons} from 'react/addons';
import sinon from 'sinon';

assert.called = sinon.assert.called;

const TestUtils = addons.TestUtils;

class ComponentDouble extends React.Component {
  render() {
    return <b props={this.props}></b>;
  }
}

var rendererOutput;
describe('app startup', function() {

  function render(data={}) {
    const shallowRenderer = TestUtils.createRenderer();
    let app = new AppStartup(ComponentDouble, shallowRenderer.render.bind(shallowRenderer));
    app.renderClientSide(data);
    rendererOutput = shallowRenderer.getRenderOutput();
  }

  it('renders the given component', function() {
    sinon.spy(ComponentDouble.prototype, 'render');
    render();
    assert.called(ComponentDouble.prototype.render);
  });
  it('with the given data', function() {
    let data = {my: 'data'};
    render(data);
    assert.deepEqual(rendererOutput.props.props, {kataGroups: data});
  });
});
