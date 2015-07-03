import React from 'react';

export default class Katas extends React.Component {
  render() {
    return <div id="list" className="pure-u-1">
      <div className="email-item email-item-selected pure-g">
        <div className="pure-u-3-4">
          <h5 className="email-name">basics</h5>
        </div>
      </div>
      <div className="email-item email-item-unread pure-g">
        <div className="pure-u-3-4">
          <h5 className="email-name">multiline</h5>
        </div>
      </div>
      <div className="email-item pure-g">
        <div className="pure-u-3-4">
          <h5 className="email-name">tagged</h5>
        </div>
      </div>
      <div className="email-item pure-g">
        <div className="pure-u-3-4">
          <h5 className="email-name">`raw` property</h5>
        </div>
      </div>
    </div>
  }
}
