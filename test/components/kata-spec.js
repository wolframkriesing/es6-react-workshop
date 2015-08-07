import React from 'react'; // eslint-disable-line no-unused-vars
import KataComponent from '../../src/components/kata.js';
import {
  rendersDomNodeWithTextContent
} from 'react-components-asserts';

describe('katas component', function() {

  const kata = {
    name: 'kata name',
    description: 'kata desc'
  };

  it('renders the name', function() {
    let comp = <KataComponent kata={kata} />;
    rendersDomNodeWithTextContent(comp, kata.name);
  });

  it('renders the description', function() {
    let comp = <KataComponent kata={kata} />;
    rendersDomNodeWithTextContent(comp, kata.description);
  });

});
