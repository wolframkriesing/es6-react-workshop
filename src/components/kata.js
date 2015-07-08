import React from 'react';

export default class KataComponent extends React.Component {
  render() {
    return (
      <div id="main" className="pure-u-1">
        <div className="email-content">
          <div className="email-content-header pure-g">
            <div className="pure-u-1-2">
              <h1 className="email-content-title">Template strings - basics</h1>

              <p className="email-content-subtitle">
                A template string, is wrapped in backticks.
              </p>
            </div>

            <div className="email-content-controls pure-u-1-2">
              <button className="secondary-button pure-button">Open in TDDbin</button>
            </div>
          </div>

          <div className="email-content-body">
            <p>nothing here yet</p>
          </div>
        </div>
      </div>
    );
  }
}
