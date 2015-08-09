import React from 'react'; // eslint-disable-line no-unused-vars
import KataComponent from '../../src/components/kata.js';
import {
  rendersDomNodeWithTextContent,
  rendersDomNodeWithAttrAndValue
} from 'react-components-asserts';

describe('katas component', function() {

  const kataData = {
    id: 42,
    name: 'kata name',
    description: 'kata desc',
    kataGroup: {name: 'group name'}
  };
  const outgoingUrlDouble = {toKataOnTddbin(){}};
  const appUrlDouble = {buildUrlForKata(){}};

  function buildComponent(kata=kataData, outgoingUrl=outgoingUrlDouble) {
    return <KataComponent kata={kata} outgoingUrl={outgoingUrl} appUrl={appUrlDouble} />;
  }

  it('renders `#ID`', function() {
    let comp = buildComponent(kataData);
    rendersDomNodeWithTextContent(comp, `#${kataData.id}`);
  });

  it('renders the name', function() {
    let comp = buildComponent(kataData);
    rendersDomNodeWithTextContent(comp, `${kataData.name}`);
  });

  it('renders the description', function() {
    let comp = buildComponent(kataData);
    rendersDomNodeWithTextContent(comp, kataData.description);
  });

  it('renders the kata group name', function() {
    let comp = buildComponent(kataData);
    rendersDomNodeWithTextContent(comp, kataData.kataGroup.name);
  });

  it('renders the outgoing URL to tddbin, to the kata', function() {
    const tddbinUrl = 'tddbinUrl';
    const outgoingUrl = {toKataOnTddbin(){ return tddbinUrl; }};
    let comp = buildComponent(undefined, outgoingUrl);
    rendersDomNodeWithAttrAndValue(comp, 'href', tddbinUrl);
  });

});
