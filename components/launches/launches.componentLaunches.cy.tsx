import React from 'react';
import { mount } from 'cypress/react18';
import { Launches } from './launches.component';

describe('Launch Component', () => {
  it('renders', () => {
    mount(<Launches />);

    it('should render the list of Card', () => {
      cy.get('[data-testid="launch-card"]').should('have.length', 10);
    });
  });
});
