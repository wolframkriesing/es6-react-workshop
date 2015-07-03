import React from 'react';

export default class KataGroups extends React.Component {
  render() {
    const {kataGroups} = this.props;
    return (
      <div id="nav" className="pure-u">
        <a href="#" className="nav-menu-button">Menu</a>

        <div className="nav-inner">
          <div className="pure-menu">
            <ul className="pure-menu-list">
              <li className="pure-menu-heading">Kata groups</li>
              <li className="pure-menu-item">
              </li>
              {kataGroups.map(kataGroup => <li className="pure-menu-item">
                <a href={`#kataGroup=${encodeURIComponent(kataGroup.name)}`} className="pure-menu-link">{kataGroup.name} <span className="email-count">({kataGroup.katasCount})</span></a>
              </li>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

