describe('Login Test Scenarios', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('h1').should('have.text', 'Login').and('be.visible');
  });

  it('Test Scenario 1: Verify Login Text', () => {
    // Assert the presence and text of the Login header
    cy.get('h1').should('be.visible').and('have.text', 'Login');
  });

  it('Test Scenario 2: Verify Username Placeholder Field Text', () => {
    // Assert the placeholder text for the Username field
    cy.get('#username').should('have.attr', 'placeholder', 'Username');
  });

  it('Test Scenario 3: Verify Password Placeholder Field Text', () => {
    // Assert the placeholder text for the Password field
    cy.get('#password').should('have.attr', 'placeholder', 'Password');
  });

  it('Test Scenario 4: Verify Login Button Text', () => {
    // Assert the text on the Login button
    cy.get('input[type="submit"]').should('have.value', 'Login');
  });

  it('Test Scenario 5: Verify Successful Login', () => {
    cy.log('this is env output'+ Cypress.env('UN_PWD'))
    cy.get('#username').type(Cypress.env('UN_PWD'));   
    cy.get('#password').type(Cypress.env('UN_PWD'));   
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/band');
    // Assert that the page title is as expected
    cy.title().should('eq', 'W3.CSS Template');
    // Assert that the brand name is "THE BAND"
    cy.contains('h2', 'THE BAND').should('exist');
  });

  it('Test Scenario 6: Verify Invalid Username', () => {
    cy.get('#username').type('invalidUsername'); 
    cy.get('#password').type(Cypress.env('UN_PWD'));
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/not_found');
    cy.contains('404 Not Found').should('be.visible')
    cy.contains('Please enter valid username and password!').should('be.visible')
    // Go back to the previous page
    cy.go('back');
  });

  it('Test Scenario 7: Verify Invalid Password', () => {
    cy.get('#username').type(Cypress.env('UN_PWD')); 
    cy.get('#password').type('invalidPassword');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/not_found');
    // Go back to the previous page
    cy.go('back');
  });

  it('Test Scenario 8: Verify Username Field Error Message', () => {
    cy.get('input[type="submit"]').click(); 
    // Assert that the username field is required
    cy.get('#username').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill in this field.');
    });
  });

  it('Test Scenario 9: Verify Password Field Error Message', () => {
    cy.get('#username').type(Cypress.env('UN_PWD'));
    cy.get('input[type="submit"]').click()
    // Assert that the username field is required
    cy.get('#password').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill in this field.');
    });
  });
});
