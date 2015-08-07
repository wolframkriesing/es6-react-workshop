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

  function buildComponent({kataName='', description='', urlForKata=''}) {
    const rawKataData = {
      'kata group name': {items: [{id: 1, name: kataName, description: description}]}
    };
    let kataGroups = KataGroups.fromRawKataData(rawKataData);
    const kataGroup = kataGroups.firstGroup;
    const appUrlDouble = {buildUrlForKata() { return urlForKata; }};
    return <KatasComponent kataGroup={kataGroup} appUrl={appUrlDouble} />;
  }
  function render(componentToRender) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(componentToRender);
    return shallowRenderer.getRenderOutput();
  }

  it('renders as many katas as there are', function() {
    let output = render(buildComponent({}));
    let renderedKatas = output.props.children;
    assert.equal(renderedKatas.length, 1);
  });
  describe('renders the properties', function() {
    it('the `name`', function() {
      const kataName = 'kata name';
      assert.rendersDomNodeWithTextContent(buildComponent({kataName}), kataName);
    });
    it('the `description`', function() {
      const description = 'kata desc';
      assert.rendersDomNodeWithTextContent(buildComponent({description}), description);
    });
    it('the URL properly', function() {
      const urlForKata = 'url for kata';
      assert.rendersDomNodeWithAttrAndValue(buildComponent({urlForKata}), 'href', urlForKata);
    });
  });

  it('highlights the selected kata', function() {
    const rawKataData = {
      one: {items: [{id: 1, name: 'one', description: 'desc 1'}]},
      two: {items: [{id: 2, name: 'two', description: 'desc 2'}]}
    };
    let kataGroups = KataGroups.fromRawKataData(rawKataData);

    const urlForKata = 'urlForKata';
    const appUrlDouble = {buildUrlForKata() { return urlForKata; }};
    let component = <KatasComponent
      selectedKata={kataGroups.selectedKata}
      kataGroup={kataGroups.selectedGroup}
      appUrl={appUrlDouble} />;

    assert.rendersDomNodeWithAttrAndValue(component, 'className', KatasComponent.CLASSNAMES_FOR_SELECTED_KATA);
  });
});
