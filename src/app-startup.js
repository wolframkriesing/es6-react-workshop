import React from 'react'; // eslint-disable-line no-unused-vars

export default class AppStartup {
  constructor(PageComponent, renderFunction) {
    this.PageComponent = PageComponent;
    this.renderFunction = renderFunction;
  }
  renderClientSide(kataGroups, appDomNode) {
    const PageComponent = this.PageComponent;
    this.renderFunction(<PageComponent kataGroups={kataGroups}/>, appDomNode);
  }
}

