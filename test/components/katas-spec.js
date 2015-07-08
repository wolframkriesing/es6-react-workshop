import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

import KatasComponent from '../../src/components/katas.js';
import KataGroups from '../../src/katagroups.js';

describe('KatasComponent', function() {

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
    let output = render(component);
    let firstKata = render(output.props.children[0]).props.children.props.children[0].props.children;
    assert.equal(firstKata, kataName);
  });
  it('render the `description`', function() {
    let output = render(component);
    let firstKata = render(output.props.children[0]).props.children.props.children[1].props.children;
    assert.equal(firstKata, description);
  });
  it('render the URL properly', function() {
    let output = render(component);
    let firstKata = render(output.props.children[0]).props.children.props;
    assert.equal(firstKata.href, '???&kataId=1');
  });
});
