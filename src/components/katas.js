import React from 'react';
import {KataGroup} from '../katagroups.js';

export default class KatasComponent extends React.Component {

  static propTypes = {
    kataGroup: React.PropTypes.instanceOf(KataGroup).isRequired
  };

  render() {
    const appUrl = this.props.appUrl;
    const {katas} = this.props.kataGroup;
    return (
      <div id="list" className="pure-u-1">
        {katas.map(kata => <KataLinkComponent kata={kata} appUrl={appUrl} />)}
      </div>
    );
  }
}

class KataLinkComponent extends React.Component {
  render() {
    var {kata, appUrl} = this.props;
    return (
      <div className="email-item pure-g">
        <a className="pure-u-3-4" href={appUrl.buildUrlForKata(kata)}>
          <h4 className="email-subject">{kata.name}</h4>
          <p className="email-desc">{kata.description}</p>
        </a>
      </div>
    );
  }
}
