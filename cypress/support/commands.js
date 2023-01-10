// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});

//Add only cypress related wrapper
Cypress.Commands.add('clickOnTargetElement', targetEle => {
    cy.get(targetEle).click();
})

//
Cypress.Commands.add('typeOnTargetElement', (targetEle, content) => {
    cy.get(targetEle).type(content);
})

//Clears the target element before typing
Cypress.Commands.add('clearBeforetypingOnTargetElement', (targetEle,content) => {
    cy.get(targetEle).clear().type(content);
})

Cypress.Commands.add('uncaughtExceptionHandler', () => {
    // this event will automatically be unbound when a
    // test ends because it's attached to 'cy'
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
})



