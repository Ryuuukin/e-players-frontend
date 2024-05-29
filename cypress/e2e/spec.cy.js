// cypress/integration/loginToStats.spec.js

describe('Login to Stats Flow', () => {
  it('Logs in and navigates to stats page', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login');

    // Fill in the email and password fields
    cy.get('input[type="email"]').type('akineshova00@gmail.com');
    cy.get('input[type="password"]').type('Admin');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    cy.intercept('login').as('loginRequest');

    // Wait for the login request to complete and check for the authentication token in the cookie
    cy.wait('@loginRequest').then(() => {
      // Check if the authentication token is present in the cookie
      cy.getCookie('Authorization').then((cookie) => {
        // Navigate to the stats page if the token is present
        if (cookie) {
          cy.visit('http://localhost:3000/admin/stats');
        }
      });
    });

    // Check if the user has been redirected to the stats page
    cy.url().should('include', '/admin/stats');
  });
});
