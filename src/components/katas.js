import React from 'react';
import {KataGroup} from '../katagroups.js';

export default class KatasComponent extends React.Component {

  static propTypes = {
    kataGroup: React.PropTypes.instanceOf(KataGroup).isRequired
  };

  render() {
    const {katas} = this.props.kataGroup;
    return (
      <div id="list" className="pure-u-1">
        {katas.map(kata => <KataLinkComponent kata={kata} />)}
      </div>
    );
  }
}

export class KataLinkComponent extends React.Component {
  render() {
    const {id, name, description} = this.props.kata;
    const urlWithoutKataId = window.location.href.replace(/&kataId=\d+$/, '');
    const newUrl = `${urlWithoutKataId}&kataId=${id}`;
    return (
      <div className="email-item pure-g">
        <a className="pure-u-3-4" href={newUrl}>
          <h4 className="email-subject">{name}</h4>
          <p className="email-desc">{description}</p>
        </a>
      </div>
    );
  }
}
