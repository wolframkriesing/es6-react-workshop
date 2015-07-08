import assert from 'assert';
import React from 'react';
import {addons} from 'react/addons';
import sinon from 'sinon';
import {hasSubComponentOfType, hasSubComponentOfTypeWithProps} from '../customasserts.js';

import Page from '../../src/components/page.js';
import {default as KatasComponent} from '../../src/components/katas.js';
import {default as KataGroupsData} from '../../src/katagroups.js';

assert.hasSubComponentOfType = hasSubComponentOfType;
assert.hasSubComponentOfTypeWithProps = hasSubComponentOfTypeWithProps;
assert.called = sinon.assert.called;
assert.calledWith = sinon.assert.calledWith;

assert.renderedIntoDomNode = function(renderFunction, domNode) {
  assert.equal(renderFunction.firstCall.args[1], domNode);
};

describe('page component', function() {

  describe('uses components', function() {

    it('the Katas component', function() {
      const groupName = 'kata group name';
      const rawKataData = {[groupName]: {items: []}};
      let kataGroups = KataGroupsData.fromRawKataData(rawKataData);

      assert.hasSubComponentOfType(<Page kataGroups={kataGroups}/>, KatasComponent);
    });

  });

  describe('the Katas component', function() {
    it('receives the selectedGroup from the KataGroupsData instance', function() {
      const groupName = 'kata group name';
      const rawKataData = {[groupName]: {items: []}};
      let kataGroups = KataGroupsData.fromRawKataData(rawKataData);
      kataGroups.selectGroupByName(groupName);

      var expectedProps = {kataGroup: kataGroups.selectedGroup};
      assert.hasSubComponentOfTypeWithProps(<Page kataGroups={kataGroups}/>, KatasComponent, expectedProps);
    });
    it('if no selectedGroup exists receives the firstGroup from the KataGroupsData instance', function() {
      const rawKataData = {'first group': {items: []}, 'second group': {items: []}};
      let kataGroups = KataGroupsData.fromRawKataData(rawKataData);

      var expectedProps = {kataGroup: kataGroups.firstGroup};
      assert.hasSubComponentOfTypeWithProps(<Page kataGroups={kataGroups}/>, KatasComponent, expectedProps);
    });
  });
});
