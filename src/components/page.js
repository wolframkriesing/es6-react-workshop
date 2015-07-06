import React from 'react';

import KataGroups from './katagroups.js';
import Katas from './katas.js';
import Kata from './kata.js';

export default class Page extends React.Component {
  render() {
    const {groups, selectedGroup=groups[0]} = this.props.kataGroups;
    return <div>
      <div id="layout" className="content pure-g">
        <KataGroups kataGroups={groups}/>
        <Katas kataGroup={selectedGroup} />
        <Kata />
    </div>
    </div>;
  }
}
