import React from 'react';
import { mount } from 'cypress/react18';
import moment from 'moment';
import { Card } from './card.component';

const mockLaunchData = {
  links: {
    patch: {
      small: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png',
    },
  },
  success: false,
  failures: [
    {
      time: 33,
      altitude: null,
      reason: 'merlin engine failure',
    },
  ],
  details: 'Engine failure at 33 seconds and loss of vehicle',
  payloads: [
    {
      name: 'FalconSAT-2',
      type: 'Satellite',
      id: '5eb0e4b5b6c3bb0006eeb1e1',
    },
  ],
  name: 'FalconSat',
  date_utc: '2006-03-24T22:30:00.000Z',
  cores: [
    {
      core: {
        serial: 'Merlin1A',
        id: '5e9e289df35918033d3b2623',
      },
    },
  ],
  id: '5eb87cd9ffd86e000604b32a',
};

describe('Card Component', () => {
  it('renders', () => {
    mount(<Card launch={mockLaunchData} />);
    cy.get('[data-testid="launch-name"]').should('contain.text', mockLaunchData.name);
    cy.get('[data-testid="launch-date"]').should(
      'contain.text',
      moment(String(mockLaunchData.date_utc)).format('ddd, MMM Do YYYY, h:mm a')
    );
    cy.get('[data-testid="launch-core"]').should('contain.text', mockLaunchData.cores[0].core.serial);
    cy.get('[data-testid="payload-info"]').should(
      'contain.text',
      `${mockLaunchData.payloads[0].id} - ${mockLaunchData.payloads[0].type}`
    );
    cy.get('[data-testid="launch-status"]').should('contain.text', 'Failure');
  });
});
