import assert from 'assert';
import React from 'react';
import {addons} from 'react/addons';
import sinon from 'sinon';
import {hasChildOfType} from '../customasserts.js';

import Page from '../../src/components/page.js';
import Katas from '../../src/components/katas.js';
import {default as KataGroupsData} from '../../src/katagroups.js';

assert.hasChildOfType = hasChildOfType;
assert.called = sinon.assert.called;
assert.calledWith = sinon.assert.calledWith;

assert.renderedIntoDomNode = function(renderFunction, domNode) {
  assert.equal(renderFunction.firstCall.args[1], domNode);
};

const TestUtils = addons.TestUtils;

describe('page component', function() {

  describe('uses components', function() {

    it('the Katas component', function() {
      const groupName = 'kata group name';
      const rawKataData = {[groupName]: {items: []}};
      let kataGroups = KataGroupsData.fromRawKataData(rawKataData);

      assert.hasChildOfType(<Page kataGroups={kataGroups}/>, Katas);
    });

  });

  describe('the Katas component', function() {
    it('receives the selectedGroup from the KataGroupsData instance', function() {
      
    });
    it('if no selectedGroup exists receives the first group from the KataGroupsData instance', function() {
      
    });
  });
});