/// <reference types="cypress" />
/**
 * E2E: Full UI test – all 8 components
 * Run with app running: npm run dev (then npm run cypress:run or npx cypress run)
 */
describe('Component library – full UI test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the app and shows main heading', () => {
    cy.contains('h1', 'Hearts Component Library').should('be.visible');
    cy.get('main').should('exist');
  });

  // Button: primary increases count
  it('Button – primary click updates count', () => {
    cy.contains('button', /Primary.*clicked 0x/).click();
    cy.contains(/clicked 1x/).should('be.visible');
  });

  // Button: disabled is not clickable (Cypress blocks click on disabled); verify it exists and count stays 0
  it('Button – disabled button does not fire click', () => {
    cy.contains('button', 'Disabled').should('be.visible').and('be.disabled');
    cy.contains(/clicked 0x/).should('be.visible');
  });

  // Button: loading button shows "Loading..." and is disabled (so it cannot fire click)
  it('Button – loading button does not fire click', () => {
    cy.get('button[aria-busy="true"]').should('be.visible').and('be.disabled').and('contain', 'Loading');
    cy.contains(/clicked 0x/).should('be.visible');
  });

  // Toggle: controlled state updates text
  it('Toggle – dark mode ON/OFF updates text', () => {
    cy.contains('Dark mode: OFF').should('be.visible');
    cy.get('[role="switch"][aria-label="Dark mode"]').click();
    cy.contains('Dark mode: ON').should('be.visible');
    cy.get('[role="switch"][aria-label="Dark mode"]').click();
    cy.contains('Dark mode: OFF').should('be.visible');
  });

  // Tabs: switch tabs and see content
  it('Tabs – switch tabs and see correct content', () => {
    cy.contains('This is the overview tab content.').should('be.visible');
    cy.get('[role="tab"]').contains('Features').click();
    cy.contains('This is the features tab content.').should('be.visible');
    cy.get('[role="tab"]').contains('Pricing').click();
    cy.contains('This is the pricing tab content.').should('be.visible');
  });

  // Input: type in Name
  it('Input – typing in Name updates value', () => {
    cy.get('input[placeholder="Enter your name"]').type('Jane');
    cy.get('input[placeholder="Enter your name"]').should('have.value', 'Jane');
  });

  // Modal: open and close
  it('Modal – opens and closes', () => {
    cy.contains('button', 'Open Modal').click();
    cy.get('[role="dialog"]').should('be.visible').and('contain', 'Example Modal');
    cy.get('[aria-label="Close"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  // Card: visible
  it('Card – cards and content visible', () => {
    cy.contains('Getting Started').should('be.visible');
    cy.contains('Learn More').should('be.visible');
    cy.contains('Best Practices').should('be.visible');
  });

  // Dropdown: select and see selection
  it('Dropdown – select option updates "Selected:"', () => {
    cy.get('[role="combobox"]').first().click();
    cy.get('[role="option"]').contains('Vue').click();
    cy.contains('Selected: vue').should('be.visible');
  });

  // Alert: visible
  it('Alert – alerts visible', () => {
    cy.contains('This is an informational message.').should('be.visible');
    cy.contains('Operation completed successfully!').should('be.visible');
  });

  it('has accessible structure (landmarks and roles)', () => {
    cy.get('main').should('exist');
    cy.get('header').should('exist');
    cy.contains('button', 'Open Modal').should('have.attr', 'type');
  });
});
