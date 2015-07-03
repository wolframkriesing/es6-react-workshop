import React from 'react';

export default class KataGroups extends React.Component {
  render() {
    return (
      <div id="nav" className="pure-u">
        <a href="#" className="nav-menu-button">Menu</a>

        <div className="nav-inner">
          <div className="pure-menu">
            <ul className="pure-menu-list">
              <li className="pure-menu-heading">Kata groups</li>
              <li className="pure-menu-item">
              </li>
              {this.props.groupNames.map(groupName => <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">{groupName}  <span className="email-count">(2)</span></a>
              </li>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

