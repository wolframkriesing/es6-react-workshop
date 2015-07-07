import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

export function hasChildOfType(componentToRender, type) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(componentToRender);

  let output = shallowRenderer.getRenderOutput();

  let components = output.props.children.props.children;
  assert.equal(components
    .map(component => TestUtils.isElementOfType(component, type))
    .some(value => value)
  , true, `Expected type to be ${type}.`);
}
