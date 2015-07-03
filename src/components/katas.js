import React from 'react';

export default class Katas extends React.Component {
  render() {
    const {katas} = this.props.kataGroup;
    return (
      <div id="list" className="pure-u-1">
        {katas.map(kata => <KataLink kata={kata} />)}
      </div>
    )
  }
}

class KataLink extends React.Component {
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
