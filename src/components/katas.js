import React from 'react';

export default class Katas extends React.Component {
  render() {
    const {katas=[]} = this.props.kataGroup;
    return (
      <div id="list" className="pure-u-1">
        {katas.map(kata => <KataLink kata={kata} />)}
      </div>
    )
  }
}

class KataLink extends React.Component {
  render() {
    const {name, description} = this.props.kata;
    return (
      <div className="email-item pure-g">
        <div className="pure-u-3-4">
          <h4 className="email-subject">{name}</h4>
          <p className="email-desc">{description}</p>
        </div>
      </div>
    );
  }
}