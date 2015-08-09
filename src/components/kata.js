import React from 'react';

export default class KataComponent extends React.Component {
  render() {
    const {kata, outgoingUrl, appUrl} = this.props;
    const group = kata.kataGroup;

    return (
      <div id="main" className="pure-u-1">
        <div className="email-content">
          <div className="email-content-header pure-g">
            <div className="pure-u-1-5">
              <a className="primary-button pure-button" target="_blank" href={outgoingUrl.toKataOnTddbin(kata)}>Solve this kata</a>
            </div>
            <div className="pure-u-4-5">
              <h1 className="email-content-title"><a href={appUrl.buildUrlForKata(kata)}>#{kata.id}</a> {group.name}: {kata.name}</h1>
              <p className="email-content-subtitle">Released {kata.releaseDateAgo}</p>
              <h2>{kata.description}</h2>
            </div>
          </div>

          <div className="email-content-body">
            <h2>The following katas are recommended to do before this kata</h2>
            <ul>
              <li><a href={appUrl.buildUrlForKata(kata.dependsOnKatas)}>#8 Block scope: `const` declaration</a></li>
              <li><a href={appUrl.buildUrlForKata(kata.dependsOnKatas)}>#5 Arrow functions: basics</a></li>
            </ul>

            <h2>More in depth links</h2>
            <ul>
              <li><a href="">Moziila MDN</a></li>
            </ul>

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
