import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {
  rendersDomNodeWithAttrAndValue,
  rendersDomNodeWithTextContent
} from 'react-components-asserts';

assert.rendersDomNodeWithAttrAndValue = rendersDomNodeWithAttrAndValue;
assert.rendersDomNodeWithTextContent = rendersDomNodeWithTextContent;

import KatasComponent from '../../src/components/katas.js';
import KataGroups from '../../src/katagroups.js';

describe('KatasComponent', function() {

  let component;
  let kataGroup;
  var kataName = 'kata name';
  var description = 'kata desc';
  const urlForKata = 'url for kata';
  beforeEach(function() {
    const rawKataData = {
      'kata group name': {items: [{id: 1, name: kataName, description: description}]}
    };
    let kataGroups = KataGroups.fromRawKataData(rawKataData);
    kataGroup = kataGroups.firstGroup;
    const appUrlDouble = {constructUrlForKata() { return urlForKata; }};
    component = <KatasComponent kataGroup={kataGroup} appUrl={appUrlDouble} />;
  });
  function render(componentToRender) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(componentToRender);
    return shallowRenderer.getRenderOutput();
  }

  it('renders as many katas as there are', function() {
    let output = render(component);
    let renderedKatas = output.props.children;
    assert.equal(renderedKatas.length, 1);
  });
  describe('renders the properties', function() {
    it('the `name`', function() {
      assert.rendersDomNodeWithTextContent(component, kataName);
    });
    it('the `description`', function() {
      assert.rendersDomNodeWithTextContent(component, description);
    });
    it('the URL properly', function() {
      assert.rendersDomNodeWithAttrAndValue(component, 'href', urlForKata);
    });
  });
});
