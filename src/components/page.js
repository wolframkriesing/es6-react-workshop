import React from 'react';

import KataGroups from './katagroups.js';
import Katas from './katas.js';
import Kata from './kata.js';

export default class Page extends React.Component {
  render() {
    const {groups, selectedGroup} = this.props.kataGroups;
    return <div>
      <div id="layout" className="content pure-g">
        <KataGroups kataGroups={groups}/>
        <Katas kataGroup={selectedGroup || groups[0]} />
        <Kata />
    </div>
    </div>;
  }
}
