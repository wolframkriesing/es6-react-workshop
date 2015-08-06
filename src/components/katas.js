import React from 'react';
import {KataGroup} from '../katagroups.js';

export default class KatasComponent extends React.Component {

  static propTypes = {
    kataGroup: React.PropTypes.instanceOf(KataGroup).isRequired
  };

  render() {
    const {appUrl, kataGroup, selectedKata} = this.props;
    const {katas} = kataGroup;
    const isSelected = kata => kata === selectedKata;
    return (
      <div id="list" className="pure-u-1">
        {katas.map(kata => <KataLinkComponent kata={kata} isSelected={isSelected(kata)} appUrl={appUrl} />)}
      </div>
    );
  }
}
KatasComponent.CLASSNAMES_FOR_SELECTED_KATA = 'email-item pure-g email-item-selected';
KatasComponent.CLASSNAMES_FOR_UNSELECTED_KATA = 'email-item pure-g';

class KataLinkComponent extends React.Component {
  render() {
    let {kata, appUrl, isSelected} = this.props;
    let classNames = KatasComponent.CLASSNAMES_FOR_UNSELECTED_KATA;
    if (isSelected) {
      classNames = KatasComponent.CLASSNAMES_FOR_SELECTED_KATA;
    }
    return (
      <div className={classNames}>
        <a className="pure-u-3-4" href={appUrl.buildUrlForKata(kata)}>
          <h4 className="email-subject">{kata.name}</h4>
          <p className="email-desc">{kata.description}</p>
        </a>
      </div>
    );
  }
}
