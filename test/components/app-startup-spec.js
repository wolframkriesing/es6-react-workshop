import assert from 'assert';
import AppStartup from '../../src/app-startup.js';
import React from 'react';
import {addons} from 'react/addons';

const TestUtils = addons.TestUtils;

class ComponentDouble extends React.Component {
  render() {
    return <div>{this.props.kataGroups}</div>;
  }
}

describe('app startup', function() {
  it('renders the given component', function() {
    const shallowRenderer = TestUtils.createRenderer();
    let app = new AppStartup(ComponentDouble, shallowRenderer);
    let data = {my: 'data'};
    app.renderClientSide(data);

    let output = shallowRenderer.getRenderOutput();
    assert.deepEqual(output.props.children, data);
  });
});
