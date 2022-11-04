// This recipe shows you how to modify bootstrapped data before
// it's sent to your application during startup.
//
// By modifying bootstrapped data you could force your application
// to use different configuration only when running under Cypress.
//
// Let's look at some different strategies based on how our app works

describe('Bootstrapping App Test Data', function () {
  // bootstrap.html is an html file generated by our node server
  // with the seed data inlined
  context('solution #1: bootstrap.html', function () {
    it('works by default using development bootstrap data', function () {
      // Let's test that the normal
      // way of development data seeding works.
      cy.visit('/bootstrap.html')
      cy.get('pre')
      .invoke('text')
      .should(
        'eq',
        JSON.stringify({
          env: 'development',
          api: 'https://api.company.com',
        })
      )
    })

    it('can modify window._bootstrappedData', function () {
      // in this solution we use cy.visit({onBeforeLoad: ...})
      // to modify the window._bootstrappedData global so that
      // it's passed into our App.start() method

      const data = {
        env: 'test',
        api: 'https://test-api.company.com',
      }

      cy.visit('/bootstrap.html', {
        onBeforeLoad: (win) => {
          win._bootstrappedData = data
        },
      })

      cy.get('pre')
      .invoke('text')
      .should('eq', JSON.stringify(data))
    })
  })

  // xhr.html is an html file generated by our node server
  // that makes an XHR request for the initial seed data
  context('solution #2: xhr.html', function () {
    it('works by default using development bootstrap data', function () {
      // Let's test that the normal
      // way of development data seeding works.
      cy.visit('/xhr.html')
      cy.get('pre')
      .invoke('text')
      .should(
        'eq',
        JSON.stringify({
          env: 'development',
          api: 'https://api.company.com',
        })
      )
    })

    it('can modify the seed data by stubbing the XHR', function () {
      // store our test bootstrap data as a fixture
      // data in /fixtures/bootstrap.json
      cy.fixture('bootstrap.json').then((data) => {
        cy.inspect('GET', '/data.json', data)
        cy.visit('/xhr.html')
        cy.get('pre')
        .invoke('text')
        .should('eq', JSON.stringify(data))
      })
    })

    it('waits for the XHR before asserting', function () {
      // In our local solution above the XHR happens
      // so fast that we don't need to explictly wait on it
      //
      // However these two previous solutions should both probably wait
      // on the XHR using an aliased route
      //
      // This insulates you from making assertions prior to the data
      // coming in

      cy.fixture('bootstrap.json').then((data) => {
        cy.inspect(
          '/data.json',
          {
            delay: 2000, // simulate a slow XHR request
            body: data,
          }
        ).as('getData')

        cy.visit('/xhr.html')
        cy.wait('@getData')
        cy.get('pre')
        .invoke('text')
        .should('eq', JSON.stringify(data))
      })
    })
  })
})
