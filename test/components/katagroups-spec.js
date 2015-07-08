import assert from 'assert';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

import {hasSubComponentOfType, hasSubComponentOfTypeWithProps} from '../customasserts.js';

import KataGroupsComponent from '../../src/components/katagroups.js';
import KatasComponent from '../../src/components/katas.js';
import KataComponent from '../../src/components/kata.js';
import KataGroups from '../../src/katagroups.js';

assert.hasSubComponentOfType = hasSubComponentOfType;
assert.hasSubComponentOfTypeWithProps = hasSubComponentOfTypeWithProps;

describe('KataGroupsComponent', function() {

  let component;
  let kataGroups;
  beforeEach(function() {
    const groupName = 'kata group name';
    const rawKataData = {[groupName]: {items: []}, 'group 2': {items: []}};
    kataGroups = KataGroups.fromRawKataData(rawKataData);
    component = <KataGroupsComponent kataGroups={kataGroups}/>;
  });
  function render(component) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(component);
    return shallowRenderer.getRenderOutput();
  }
  it('renders as many kata groups as there are', function() {
    let output = render(component);
    let renderedKataGroups = output.props.children[1].props.children.props.children.props.children[2];
    assert.equal(renderedKataGroups.length, 2);
  });
  it('render the `url` into `href` attribute', function() {
    let firstKataGroup = kataGroups.firstGroup;
    var linkIndex = 0;
    let output = render(component);
    let firstLink = output.props.children[1].props.children.props.children.props.children[2][linkIndex].props.children.props;
    assert.equal(firstLink.href, firstKataGroup.url);
  });
  it('renders the `name`', function() {
    let firstKataGroup = kataGroups.firstGroup;
    var linkIndex = 0;
    let output = render(component);
    let firstLink = output.props.children[1].props.children.props.children.props.children[2][linkIndex].props.children.props;
    assert.equal(firstLink.children[0], firstKataGroup.name);
  });
  it('renders "(`kataCount`)"', function() {
    let firstKataGroup = kataGroups.firstGroup;
    var linkIndex = 0;
    let output = render(component);
    let spanInLink = output.props.children[1].props.children.props.children.props.children[2][linkIndex].props.children.props.children[2];
    assert.equal(spanInLink.props.children.join(''), `(${firstKataGroup.katasCount})`);
  });
});
