describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  context('when there is no launch data available', () => {
    it('displays "Loading..." text', () => {
      cy.get('[data-testid="launch-card-loading"]').should('contain.text', 'Loading...');
    });
  });
  it('should render the correct title and description', () => {
    cy.title().should('eq', 'SpaceX - Launches');
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Top 10 latest SpaceX launch data');
  });

  it('should render the correct heading', () => {
    cy.contains('h1', 'SpaceX - Latest Launches');
  });

  it('should render the list of launches', () => {
    cy.get('[data-testid="launch-card"]').should('have.length', 10);
  });
});

export {};
