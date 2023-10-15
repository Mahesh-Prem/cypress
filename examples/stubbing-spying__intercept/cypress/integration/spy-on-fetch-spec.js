/// <reference types="Cypress" />

describe('intercept', () => {
  context('spying', function () {
    beforeEach(function () {
      cy.intercept('/favorite-fruits').as('fetchFruits')
      cy.visit('/')
    })

    it('requests favorite fruits', function () {
      cy.wait('@fetchFruits').its('response.body')
      .then((fruits) => {
        cy.get('.favorite-fruits li').should('have.length', fruits.length)

        fruits.forEach((fruit) => {
          cy.contains('.favorite-fruits li', fruit)
        })
      })
    })

    it('spying on 2nd domain', () => {
      cy.intercept('https://jsonplaceholder.cypress.io/users').as('users')
      cy.get('#load-users').click()
      cy.wait('@users').its('response.body').should('have.length', 3)
      .its('0') // grab the first user from the list
      .then((user) => {
        expect(user).to.have.property('id')
        expect(user).to.have.property('username')
        expect(user).to.have.property('email')

        // the user should be shown on the page
        cy.contains('.user', `${user.id} - ${user.email}`).should('be.visible')
      })

      // there should be three users displayed on the page
      cy.get('.user').should('have.length', 3)
    })
  })
})
