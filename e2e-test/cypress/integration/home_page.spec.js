describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('meteor-application-template')
    cy.contains('Login')
  })
  it('can login as john', () => {
    cy.login('john@foo.com', 'changeme')
    cy.contains('Add Stuff')
    cy.contains('List Stuff')
    cy.contains('john@foo.com')
  })
  it('can login as admin', () => {
    cy.login('admin@foo.com', 'changeme')
    cy.contains('Add Stuff')
    cy.contains('List Stuff')
    cy.contains('Admin')
    cy.contains('admin@foo.com')
  })
})
