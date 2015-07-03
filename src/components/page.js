import React from 'react';

import KataGroups from './katagroups.js';
import Katas from './katas.js';
import Kata from './kata.js';

export default class Page extends React.Component {
  render() {
    return <div>
      <div id="layout" className="content pure-g">
        <KataGroups groupNames={Object.keys(this.props.katas)}/>
        <Katas />
        <Kata />
    </div>
    </div>;
  }
}
