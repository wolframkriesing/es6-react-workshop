import React from 'react';

import KataGroups from './katagroups';
import Katas from './katas.js';
import Kata from './kata.js';
import {default as KataGroupsData} from '../katagroups.js';

export default class Page extends React.Component {
  static propTypes = {
    kataGroups: React.PropTypes.instanceOf(KataGroupsData).isRequired
  };

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
