import React from 'react'; // eslint-disable-line no-unused-vars

export default class AppStartup {
  constructor(PageComponent, renderer) {
    this.PageComponent = PageComponent;
    this.renderer = renderer;
  }
  renderClientSide(kataGroups, appDomNode) {
    const PageComponent = this.PageComponent;
    this.renderer.render(<PageComponent kataGroups={kataGroups}/>, appDomNode);
  }
}

