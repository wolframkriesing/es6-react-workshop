import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import {rendersDomNodeWithAttrAndValue} from 'react-components-asserts';

assert.rendersDomNodeWithAttrAndValue = rendersDomNodeWithAttrAndValue;

import KatasComponent from '../../src/components/katas.js';
import KataGroups from '../../src/katagroups.js';

describe('KatasComponent', function() {

  assert.rendersDomNodeAttributeWithValue = function(component, attribute, expectedValue) {
    let output = render(component);
    let firstKata = render(output.props.children[0]).props.children.props;
    assert.equal(firstKata[attribute], expectedValue);
  };
  assert.rendersDomNodeWithInnerText = function(componentToRender, text) {
    let output = render(render(componentToRender).props.children[0]);
    let matches = output.props.children.props.children
      .map(({props: {children}}) => children)
      .filter(content => content === text)
    ;
    var message = `Expected \`${componentToRender.type.name}\` to render a DOM node with innerText \`${text}\``;
    assert.equal(matches.length > 0, true, message);
  };

  let component;
  let kataGroup;
  var kataName = 'kata name';
  var description = 'kata desc';
  beforeEach(function() {
    const rawKataData = {
      'kata group name': {items: [{id: 1, name: kataName, description: description}]}
    };
    let kataGroups = KataGroups.fromRawKataData(rawKataData);
    kataGroup = kataGroups.firstGroup;
    component = <KatasComponent kataGroup={kataGroup} />;
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
  it('render the `name`', function() {
    assert.rendersDomNodeWithInnerText(component, kataName);
  });
  it('render the `description`', function() {
    assert.rendersDomNodeWithInnerText(component, description);
  });
  it('render the URL properly', function() {
    assert.rendersDomNodeWithAttrAndValue(component, 'href', '???&kataId=1');
  });
});
