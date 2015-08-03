import assert from 'assert';
import React from 'react'; // eslint-disable-line no-unused-vars
import {hasSubComponentOfType, hasSubComponentOfTypeWithProps} from '../customasserts.js';

import PageComponent from '../../src/components/page.js';
import KataGroupsComponent from '../../src/components/katagroups.js';
import KatasComponent from '../../src/components/katas.js';
import KataComponent from '../../src/components/kata.js';
import KataGroups from '../../src/katagroups.js';

assert.hasSubComponentOfType = hasSubComponentOfType;
assert.hasSubComponentOfTypeWithProps = hasSubComponentOfTypeWithProps;

describe('page component', function() {

  describe('uses components', function() {

    let component;
    beforeEach(function() {
      const groupName = 'kata group name';
      const rawKataData = {[groupName]: {items: []}};
      let kataGroups = KataGroups.fromRawKataData(rawKataData);
      component = <PageComponent kataGroups={kataGroups}/>;
    });
    it('KataGroups', function() {
      assert.hasSubComponentOfType(component, KataGroupsComponent);
    });
    it('Katas', function() {
      assert.hasSubComponentOfType(component, KatasComponent);
    });
    it('Kata', function() {
      assert.hasSubComponentOfType(component, KataComponent);
    });

  });

  describe('the Katas component', function() {
    const appUrlDouble = {};
    it('receives the selectedGroup from the KataGroupsData instance', function() {
      const groupName = 'kata group name';
      const rawKataData = {[groupName]: {items: []}};
      let kataGroups = KataGroups.fromRawKataData(rawKataData);
      kataGroups.selectGroupBySlug(groupName);

      var expectedProps = {kataGroup: kataGroups.selectedGroup, appUrl: appUrlDouble};
      assert.hasSubComponentOfTypeWithProps(<PageComponent kataGroups={kataGroups} appUrl={appUrlDouble} />, KatasComponent, expectedProps);
    });
    it('if no selectedGroup exists receives the firstGroup from the KataGroupsData instance', function() {
      const rawKataData = {'first group': {items: []}, 'second group': {items: []}};
      let kataGroups = KataGroups.fromRawKataData(rawKataData);

      var expectedProps = {kataGroup: kataGroups.firstGroup, appUrl: appUrlDouble};
      assert.hasSubComponentOfTypeWithProps(<PageComponent kataGroups={kataGroups} appUrl={appUrlDouble}/>, KatasComponent, expectedProps);
    });
  });
});
