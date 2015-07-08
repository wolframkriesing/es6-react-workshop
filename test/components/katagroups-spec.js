import assert from 'assert';
import React from 'react'; // eslint-disable-line no-unused-vars
import Page from '../../src/components/page.js';
import KataGroups from '../../src/katagroups.js';
import KataGroupsComponent from '../../src/components/katagroups.js';
import KatasComponent from '../../src/components/katas.js';
import {hasSubComponentOfType} from '../customasserts.js';

assert.hasSubComponentOfType = hasSubComponentOfType;

describe('kata groups component', function() {
  it('receives a KataGroup instance', function() {
    let rawData = {'group name': {items: []}};
    let kataGroups = KataGroups.fromRawKataData(rawData);
    assert.hasSubComponentOfType(<Page kataGroups={kataGroups} />, KataGroupsComponent);
  });
  it('receives a Katas instance', function() {
    let rawData = {'group name': {items: []}};
    let kataGroups = KataGroups.fromRawKataData(rawData);
    assert.hasSubComponentOfType(<Page kataGroups={kataGroups} />, KatasComponent);
  });
});
