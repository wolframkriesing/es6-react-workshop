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
    const {kataGroups, appUrl, outgoingUrl} = this.props;
    return (
      <div id="layout" className="content pure-g">
        <KataGroupsComponent kataGroups={kataGroups} appUrl={appUrl}/>
        <KatasComponent
          kataGroup={kataGroups.selectedGroup}
          selectedKata={kataGroups.selectedKata}
          appUrl={appUrl} />
        <KataComponent kata={kataGroups.selectedKata} appUrl={appUrl} outgoingUrl={outgoingUrl} />
      </div>
    );
  }
}
