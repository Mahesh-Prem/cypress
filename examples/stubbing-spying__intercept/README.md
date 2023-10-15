# Stubbing application requests using [cy.intercept](https://on.cypress.io/intercept)

- [control-clock-spec.js](cypress/integration/control-clock-spec.js) shows how to reply with different responses to an ajax request
- [spy-on-fetch-spec.js](cypress/integration/spy-on-fetch-spec.js) shows how to spy on the `fetch` call
- [stub-fetch-spec.js](cypress/integration/stub-fetch-spec.js) shows how to stub `fetch` calls from the application, or modify the page itself, or change the CSS requested by the page
- [image-spec.js](cypress/integration/image-spec.js) shows how to spy and stub static resources like images
- [matching-spec.js](cypress/integration/matching-spec.js) shows how the same request can match multiple `cy.intercept` matchers
- [repeat-spec.js](cypress/integration/repeat-spec.js) stress tests GET and POST calls by running the tests multiple times, as described in [Retry, Rerun, Repeat](https://www.cypress.io/blog/2020/12/03/retry-rerun-repeat/)
