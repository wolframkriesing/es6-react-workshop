import React from 'react';

export default class KataComponent extends React.Component {
  render() {
    const {kata, outgoingUrl, appUrl} = this.props;
    return (
      <div id="main" className="pure-u-1">
        <div className="email-content">
          <div className="email-content-header pure-g">
            <div className="pure-u-1-5">
              <a className="primary-button pure-button" target="_blank" href={outgoingUrl.toKataOnTddbin(kata)}>Open in TDDbin</a>
            </div>
            <div className="pure-u-4-5">
              <h1 className="email-content-title"><a href={appUrl.buildUrlForKata(kata)}>#{kata.id}</a> {kata.name}</h1>
              <p className="email-content-subtitle">Released {kata.releaseDateAgo}</p>
              <h2>{kata.description}</h2>
            </div>
          </div>

          <div className="email-content-body">
            <h2>Solving this kata you can learn</h2>
            <ul>
              <li>one thing</li>
              <li>one thing</li>
              <li>one thing</li>
              <li>one thing</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
