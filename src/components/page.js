import React from 'react';

import KataGroups from './katagroups';
import Katas from './katas.js';
import Kata from './kata.js';

export default class Page extends React.Component {
  render() {
    const {kataGroups} = this.props;
    const {selectedGroup=kataGroups[0]} = kataGroups;
    return <div>
      <div id="layout" className="content pure-g">
        <KataGroups kataGroups={kataGroups}/>
        <Katas kataGroup={selectedGroup} />
        <Kata />
    </div>
    </div>;
  }
}

import {default as KataGroupsData} from '../katagroups.js';
Page.propTypes = {
  kataGroups: React.PropTypes.instanceOf(KataGroupsData).isRequired
};
