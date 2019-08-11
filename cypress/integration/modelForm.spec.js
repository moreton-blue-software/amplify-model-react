/// <reference types="Cypress" />

describe("check seed data", async () => {
  it("should be empty", async () => {
    cy.visit('/')
    expect(true).to.equal(true);
    // cy.visit('dev.incentivestories.com')
  });
});
