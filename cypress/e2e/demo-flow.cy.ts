/// <reference types="cypress" />
/**
 * E2E: Complete user flow on component demo
 * - Navigate to app
 * - Interact with multiple components
 * - Verify state changes
 * - Check accessibility (roles, labels)
 */
describe('Component library demo flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the app and shows main heading', () => {
    cy.contains('h1', 'Hearts Component Library').should('be.visible');
    cy.get('main').should('exist');
  });

  it('interacts with Button and verifies click count updates', () => {
    cy.contains('button', /Primary.*clicked/).click();
    cy.contains('button', /clicked 1x/).should('be.visible');
    cy.contains('button', /Primary.*clicked/).click();
    cy.contains(/clicked 2x/).should('be.visible');
  });

  it('opens and closes Modal', () => {
    cy.contains('button', 'Open Modal').click();
    cy.get('[role="dialog"]').should('be.visible').and('contain', 'Example Modal');
    cy.get('[aria-label="Close"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('selects from Dropdown and sees selection', () => {
    cy.get('[role="combobox"]').first().click();
    cy.get('[role="option"]').contains('Vue').click();
    cy.contains('Selected: vue').should('be.visible');
  });

  it('has accessible structure (landmarks and roles)', () => {
    cy.get('main').should('exist');
    cy.get('header').should('exist');
    cy.contains('button', 'Open Modal').should('have.attr', 'type');
  });
});
