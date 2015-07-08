import React from 'react';

import KataGroupsComponent from './katagroups';
import KatasComponent from './katas.js';
import KataComponent from './kata.js';
import KataGroups from '../katagroups.js';

export default class PageComponent extends React.Component {
  static propTypes = {
    kataGroups: React.PropTypes.instanceOf(KataGroups).isRequired
  };

  render() {
    const {kataGroups} = this.props;
    const {selectedGroup = kataGroups.firstGroup} = kataGroups;
    return (
      <div id="layout" className="content pure-g">
        <KataGroupsComponent kataGroups={kataGroups}/>
        <KatasComponent kataGroup={selectedGroup} />
        <KataComponent />
      </div>
    );
  }
}
