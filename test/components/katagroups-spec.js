import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {
  rendersDomNodeWithAttrAndValue,
  rendersDomNodeWithTextContent
} from 'react-components-asserts';

assert.rendersDomNodeWithAttrAndValue = rendersDomNodeWithAttrAndValue;
assert.rendersDomNodeWithTextContent = rendersDomNodeWithTextContent;

import KataGroupsComponent from '../../src/components/katagroups.js';
import KataGroups from '../../src/katagroups.js';

describe('KataGroupsComponent', function() {

  let component;
  let kataGroups;
  let firstKataGroup;
  const kataGroupUrl = 'kata group url';
  beforeEach(function() {
    const groupName = 'kata group name';
    const rawKataData = {[groupName]: {items: []}, 'group 2': {items: []}};
    kataGroups = KataGroups.fromRawKataData(rawKataData);
    const appUrlDouble = {buildUrlForKataGroup() { return kataGroupUrl; }};
    component = <KataGroupsComponent kataGroups={kataGroups} appUrl={appUrlDouble} />;
    firstKataGroup = kataGroups.firstGroup;
  });
  function render(componentToRender) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(componentToRender);
    return shallowRenderer.getRenderOutput();
  }
  it('renders as many kata groups as there are', function() {
    let output = render(component);
    let renderedKataGroups = output.props.children[1].props.children.props.children.props.children[2];
    assert.equal(renderedKataGroups.length, 2);
  });
  describe('renders', function() {
    it('`url` into `href` attribute', () => {
      assert.rendersDomNodeWithAttrAndValue(component, 'href', kataGroupUrl);
    });
    it('`name`', () => {
      assert.rendersDomNodeWithTextContent(component, firstKataGroup.name);
    });
    it('"(`kataCount`)"', () => {
      assert.rendersDomNodeWithTextContent(component, `(${firstKataGroup.katasCount})`);
    });
  });
});
