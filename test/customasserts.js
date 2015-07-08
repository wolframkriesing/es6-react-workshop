import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

export function hasSubComponentOfType(componentToRender, expectedComponent) {
  var output = render(componentToRender);
  let components = output.props.children.props.children;
  assert.equal(components
    .map(component => TestUtils.isElementOfType(component, expectedComponent))
    .some(value => value)
  , true, `Expected type to be ${expectedComponent}.`);
}

export function hasSubComponentOfTypeWithProps(componentToRender, type, expectedProps) {
  hasSubComponentOfType(componentToRender, type);

  var output = render(componentToRender);
  const components = componentsOfType(output.props.children.props.children, type);
  assert.deepEqual(components[0].props, expectedProps);
}

function render(componentToRender) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(componentToRender);

  return shallowRenderer.getRenderOutput();
}

function componentsOfType(components, filterForComponent) {
  return components
      .filter(component => TestUtils.isElementOfType(component, filterForComponent));
}

