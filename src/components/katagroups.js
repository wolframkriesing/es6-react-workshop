import React from 'react';
import KataGroups from '../katagroups.js';

export default class KataGroupsComponent extends React.Component {

  static propTypes = {
    kataGroups: React.PropTypes.instanceOf(KataGroups).isRequired
  };

  render() {
    const {kataGroups, appUrl} = this.props;
    return (
      <div id="nav" className="pure-u">
        <a href="#" className="nav-menu-button">Menu</a>

        <div className="nav-inner">
          <div className="pure-menu">
            <ul className="pure-menu-list">
              <li className="pure-menu-heading">Kata groups</li>
              <li className="pure-menu-item">
              </li>
              {kataGroups.groups.map(kataGroup => <li className="pure-menu-item">
                <a href={appUrl.buildUrlForKataGroup(kataGroup)} className="pure-menu-link">{kataGroup.name} <span className="email-count">({kataGroup.katasCount})</span></a>
              </li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

