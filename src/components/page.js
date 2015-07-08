import React from 'react';

import KataGroupsComponent from './katagroups';
import KatasComponent from './katas.js';
import Kata from './kata.js';

export default class PageComponent extends React.Component {
  render() {
    const {kataGroups} = this.props;
    const {selectedGroup = kataGroups.firstGroup} = kataGroups;
    return (
      <div id="layout" className="content pure-g">
        <KataGroupsComponent kataGroups={kataGroups}/>
        <KatasComponent kataGroup={selectedGroup} />
        <Kata />
      </div>
    );
  }
}
