import React from 'react';

export default class KataComponent extends React.Component {
  render() {
    const {kata, outgoingUrl} = this.props;
    return (
      <div id="main" className="pure-u-1">
        <div className="email-content">
          <div className="email-content-header pure-g">
            <div className="pure-u-1-2">
              <h1 className="email-content-title">#{kata.id} {kata.name}</h1>

              <p className="email-content-subtitle">{kata.description}</p>
            </div>

            <div className="email-content-controls pure-u-1-2">
              <a className="secondary-button pure-button" target="_blank" href={outgoingUrl.toKataOnTddbin(kata)}>Open in TDDbin</a>
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
