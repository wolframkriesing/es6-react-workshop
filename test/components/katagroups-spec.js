import assert from 'assert';
import React from 'react/addons';
import Page from '../../src/components/page.js';
import KataGroups from '../../src/katagroups.js';
import {default as KataGroupsComponent} from '../../src/components/katagroups.js';
import {default as KatasComponent} from '../../src/components/katas.js';
import {hasChildOfType} from '../customasserts.js';

assert.hasChildOfType = hasChildOfType;

describe('kata groups component', function() {
  it('receives a KataGroup instance', function() {
    let rawData = {'group name': {items: []}};
    let kataGroups = KataGroups.fromRawKataData(rawData);
    assert.hasChildOfType(<Page kataGroups={kataGroups} />, KataGroupsComponent);
  });
  it('receives a Katas instance', function() {
    let rawData = {'group name': {items: []}};
    let kataGroups = KataGroups.fromRawKataData(rawData);
    assert.hasChildOfType(<Page kataGroups={kataGroups} />, KatasComponent);
  });
});
