import React from 'react';

import KataGroupsComponent from './katagroups';
import KatasComponent from './katas.js';
import Kata from './kata.js';
import {default as KataGroupsData} from '../katagroups.js';

export default class PageComponent extends React.Component {
  static propTypes = {
    kataGroups: React.PropTypes.instanceOf(KataGroupsData).isRequired
  };

  render() {
    const {kataGroups} = this.props;
    const {selectedGroup = kataGroups.firstGroup} = kataGroups;
    return <div>
      <div id="layout" className="content pure-g">
        <KataGroupsComponent kataGroups={kataGroups}/>
        <KatasComponent kataGroup={selectedGroup} />
        <Kata />
    </div>
    </div>;
  }
}
