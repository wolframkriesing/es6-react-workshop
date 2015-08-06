import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

export function hasSubComponentOfType(componentToRender, expectedComponent) {
  var output = render(componentToRender);
  const components = componentsOfType(allChildrenOf(output), expectedComponent);
  var errorMessage = `Expected \`${componentToRender.type.name}\` to have a sub component \`${expectedComponent.name}\`.`;
  assert.equal(components.length, 1, errorMessage);
}

export function hasSubComponentOfTypeWithProps(componentToRender, type, expectedProps) {
  hasSubComponentOfType(componentToRender, type);

  var output = render(componentToRender);
  const components = componentsOfType(allChildrenOf(output), type);
  // check only for the given expectedProps!
  Object.keys(expectedProps)
    .forEach(propName => {
      assert.deepEqual(components[0].props[propName], expectedProps[propName]);
    });
}

function allChildrenOf(renderedOutput) {
  // TODO make recursive to any depth
  const _allChildren = ({props = {}}) => props.children || [];
  return [..._allChildren(renderedOutput), ..._allChildren(_allChildren(renderedOutput))];
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

